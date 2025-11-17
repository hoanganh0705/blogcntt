'use client'

import { useState, useEffect } from 'react'
import { Check, Copy, ChevronDown, ChevronUp } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

// Custom theme giống hệt bản cũ
const lightTheme = {
  'code[class*="language-"]': {
    color: '#1e1e1e',
    background: 'white',
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '0.875rem',
    lineHeight: '1.5'
  },
  'pre[class*="language-"]': {
    color: '#1e1e1e',
    background: 'white',
    margin: 0,
    padding: 0
  },
  comment: { color: '#6b7280', fontStyle: 'italic' },
  punctuation: { color: '#6b7280' },
  property: { color: '#e11d48' },
  tag: { color: '#e11d48' },
  boolean: { color: '#e11d48' },
  number: { color: '#e11d48' },
  selector: { color: '#16a34a' },
  'attr-name': { color: '#16a34a' },
  string: { color: '#16a34a' },
  char: { color: '#16a34a' },
  builtin: { color: '#16a34a' },
  operator: { color: '#2563eb' },
  entity: { color: '#2563eb' },
  url: { color: '#2563eb' },
  atrule: { color: '#7c3aed' },
  'attr-value': { color: '#7c3aed' },
  keyword: { color: '#7c3aed' },
  function: { color: '#d97706' },
  'class-name': { color: '#d97706' },
  regex: { color: '#ea580c' },
  important: { color: '#ea580c' },
  variable: { color: '#ea580c' }
}

const darkTheme = {
  ...lightTheme,
  'code[class*="language-"]': {
    ...lightTheme['code[class*="language-"]'],
    color: '#e5e7eb',
    background: '#1e1e1e'
  },
  'pre[class*="language-"]': {
    ...lightTheme['pre[class*="language-"]'],
    color: '#e5e7eb',
    background: '#1e1e1e'
  },
  comment: { color: '#6b7280', fontStyle: 'italic' },
  punctuation: { color: '#9ca3af' },
  property: { color: '#f87171' },
  tag: { color: '#f87171' },
  boolean: { color: '#f87171' },
  number: { color: '#f87171' },
  selector: { color: '#34d399' },
  'attr-name': { color: '#34d399' },
  string: { color: '#34d399' },
  char: { color: '#34d399' },
  builtin: { color: '#34d399' },
  operator: { color: '#93c5fd' },
  entity: { color: '#93c5fd' },
  url: { color: '#93c5fd' },
  atrule: { color: '#c084fc' },
  'attr-value': { color: '#c084fc' },
  keyword: { color: '#c084fc' },
  function: { color: '#fbbf24' },
  'class-name': { color: '#fbbf24' },
  regex: { color: '#fb923c' },
  important: { color: '#fb923c' },
  variable: { color: '#fb923c' }
}

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
  language: propLanguage = 'text',
  showLineNumbers = true,
  highlight,
  collapsible = false,
  defaultCollapsed = false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const updateTheme = () => {
      const isDark =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.dataset.theme === 'dark'
      setTheme(isDark ? 'dark' : 'light')
    }
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    })
    return () => observer.disconnect()
  }, [])

  const codeString = children.trim()

  const highlightLines = new Set<number>()
  if (highlight) {
    highlight.split(',').forEach((part) => {
      const trimmed = part.trim()
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(Number)
        for (let i = start; i <= end; i++) highlightLines.add(i)
      } else {
        highlightLines.add(Number(trimmed))
      }
    })
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='relative rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden font-mono text-sm my-4 bg-white dark:bg-gray-900'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-2.5 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900'>
        <div className='flex items-center gap-3'>
          <span className='text-xs font-semibold uppercase text-gray-600 dark:text-gray-400'>
            {propLanguage}
          </span>
          {collapsible && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className='p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400'
            >
              {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={`p-1.5 rounded transition-colors ${
            copied
              ? 'text-green-600 dark:text-green-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>

      {/* Code */}
      <div className={`flex ${collapsed ? 'max-h-0 overflow-hidden' : ''}`}>
        {showLineNumbers && (
          <div className='px-3 py-4 select-none border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-500'>
            {codeString.split('\n').map((_, i) => (
              <div
                key={i}
                className='text-right leading-6 pr-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                onClick={() => {
                  const line = codeString.split('\n')[i]
                  navigator.clipboard.writeText(line)
                  const el = document.querySelector(`[data-line="${i}"]`)
                  el?.classList.add('copied-line')
                  setTimeout(() => el?.classList.remove('copied-line'), 1000)
                }}
                title='Click to copy line'
              >
                {i + 1}
              </div>
            ))}
          </div>
        )}

        <SyntaxHighlighter
          language={propLanguage}
          style={theme === 'dark' ? darkTheme : lightTheme}
          showLineNumbers={false}
          wrapLines
          lineProps={(lineNumber) => {
            const isHighlighted = highlightLines.has(lineNumber)
            return {
              'data-line': lineNumber - 1,
              style: {
                display: 'block',
                width: '100%',
                backgroundColor: isHighlighted
                  ? theme === 'dark'
                    ? 'rgba(251, 191, 36, 0.3)'
                    : 'rgba(255, 237, 0, 0.2)'
                  : 'transparent',
                paddingLeft: '1rem',
                marginLeft: '-1rem',
                borderLeft: isHighlighted
                  ? `3px solid ${theme === 'dark' ? '#f59e0b' : '#facc15'}`
                  : 'none'
              }
            }
          }}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.875rem'
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        pre {
          scrollbar-width: thin !important;
          scrollbar-color: ${theme === 'dark'
            ? '#4b5563 #1e1e1e'
            : '#ccc white'} !important;
        }
        pre::-webkit-scrollbar {
          height: 8px;
        }
        pre::-webkit-scrollbar-track {
          background: ${theme === 'dark' ? '#1e1e1e' : 'white'};
        }
        pre::-webkit-scrollbar-thumb {
          background: ${theme === 'dark' ? '#4b5563' : '#ccc'};
          border-radius: 4px;
        }
        .copied-line {
          background-color: ${theme === 'dark'
            ? 'rgba(34, 197, 94, 0.3)'
            : 'rgba(34, 197, 94, 0.15)'} !important;
          transition: background-color 0.3s;
        }
      `}</style>
    </div>
  )
}
