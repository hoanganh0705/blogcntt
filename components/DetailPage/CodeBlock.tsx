/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useMemo, useRef, useDeferredValue } from 'react'
import { Check, Copy, ChevronDown, ChevronUp } from 'lucide-react'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import prettier from 'prettier'
import parserTypeScript from 'prettier/parser-typescript'
import parserBabel from 'prettier/parser-babel'
import parserHtml from 'prettier/parser-html'
import parserPostcss from 'prettier/parser-postcss'

interface CodeBlockProps {
  language?: string
  showLineNumbers?: boolean
  children: string
  highlight?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export default function CodeBlock({
  children,
  language: propLanguage = 'typescript',
  showLineNumbers = true,
  highlight,
  collapsible = false,
  defaultCollapsed = false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [formattedCode, setFormattedCode] = useState('')
  const deferredCode = useDeferredValue(formattedCode)
  const preRef = useRef<HTMLPreElement>(null)

  const language = useMemo(() => {
    if (propLanguage) return propLanguage
    const trimmed = children.trim()
    if (trimmed.startsWith('<')) return 'tsx'
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) return 'json'
    if (trimmed.includes('=>') || trimmed.includes('function'))
      return 'javascript'
    return 'typescript'
  }, [children, propLanguage])

  useEffect(() => {
    const formatCode = async () => {
      try {
        const parserMap: Record<string, any> = {
          json: 'json',
          javascript: 'babel',
          jsx: 'babel',
          typescript: 'typescript',
          tsx: 'typescript',
          html: 'html',
          css: 'postcss',
          bash: 'babel',
          python: 'babel'
        }

        const parser = parserMap[language] || 'typescript'
        const plugins: any[] = []
        if (['typescript', 'tsx'].includes(language))
          plugins.push(parserTypeScript)
        if (['javascript', 'jsx', 'bash', 'python'].includes(language))
          plugins.push(parserBabel)
        if (language === 'html') plugins.push(parserHtml)
        if (language === 'css') plugins.push(parserPostcss)

        const formatted = await prettier.format(children, {
          parser,
          plugins,
          semi: true,
          trailingComma: 'es5',
          singleQuote: true,
          printWidth: 80
        })
        setFormattedCode(formatted)
      } catch (error) {
        console.error('Prettier error:', error)
        setFormattedCode(children)
      }
    }
    formatCode()
  }, [children, language])

  const highlightedCode = useMemo(() => {
    if (!deferredCode) return ''
    const prismLang = Prism.languages[language] || Prism.languages.javascript
    return Prism.highlight(deferredCode, prismLang, language)
  }, [deferredCode, language])

  const highlightLines = useMemo(() => {
    if (!highlight) return new Set<number>()
    const set = new Set<number>()
    highlight.split(',').forEach((part) => {
      const trimmed = part.trim()
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(Number)
        for (let i = start; i <= end; i++) set.add(i)
      } else {
        set.add(Number(trimmed))
      }
    })
    return set
  }, [highlight])

  const codeLines = useMemo(() => deferredCode.split('\n'), [deferredCode])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(deferredCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyLine = async (line: string, index: number) => {
    await navigator.clipboard.writeText(line)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
    const lineEl = preRef.current?.querySelector(`[data-line="${index}"]`)
    lineEl?.classList.add('copied-line')
    setTimeout(() => lineEl?.classList.remove('copied-line'), 1000)
  }

  const toggleCollapse = () => setCollapsed((prev) => !prev)

  return (
    <div className='relative rounded-lg border border-gray-300 overflow-hidden font-mono text-sm bg-white'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-2.5 border-b border-gray-300 bg-white'>
        <div className='flex items-center gap-3'>
          <span className='text-xs font-semibold uppercase text-gray-600'>
            {language}
          </span>
          {collapsible && (
            <button
              onClick={toggleCollapse}
              className='p-1 rounded hover:bg-gray-100 transition-colors text-gray-600'
              aria-label={collapsed ? 'Expand' : 'Collapse'}
            >
              {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          )}
        </div>

        <button
          onClick={handleCopy}
          className={`p-1.5 rounded transition-colors ${
            copied
              ? 'text-green-600'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
          aria-label='Copy code'
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>

      {/* Body */}
      <div
        className={`overflow-x-auto ${collapsed ? 'max-h-0 overflow-hidden' : ''}`}
      >
        <div className='flex'>
          {showLineNumbers && (
            <div className='px-3 py-4 select-none border-r border-gray-300 bg-white text-gray-500'>
              {codeLines.map((_, i) => (
                <div
                  key={i}
                  className='text-right leading-6 pr-2 cursor-pointer hover:text-blue-600 transition-colors'
                  onClick={() => handleCopyLine(codeLines[i], i)}
                  title='Click to copy line'
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}

          <pre
            ref={preRef}
            className='m-0 p-4 flex-1 overflow-x-auto leading-6'
          >
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{
                __html: highlightedCode
                  .split('\n')
                  .map((line, i) => {
                    const isHighlighted = highlightLines.has(i + 1)
                    return `<span class="line ${isHighlighted ? 'highlight-line' : ''}" data-line="${i}">${line || '&nbsp;'}</span>`
                  })
                  .join('\n')
              }}
            />
          </pre>
        </div>
      </div>

      {/* ÉP MẠNH MÀU NỀN TRẮNG */}
      <style jsx>{`
        pre {
          background: white !important;
          color: #1e1e1e !important;
        }
        .highlight-line {
          background-color: rgba(255, 237, 0, 0.2);
          display: block;
          margin: 0 -1rem;
          padding: 0 1rem;
          border-left: 3px solid #facc15;
        }
        .copied-line {
          background-color: rgba(34, 197, 94, 0.15) !important;
          transition: background-color 0.3s;
        }
        pre {
          scrollbar-width: thin;
          scrollbar-color: #ccc white;
        }
        pre::-webkit-scrollbar {
          height: 8px;
        }
        pre::-webkit-scrollbar-track {
          background: white;
        }
        pre::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}
