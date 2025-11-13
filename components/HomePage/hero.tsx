import { Button } from '../ui/button'

export function Hero() {
  return (
    <section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32'>
      <div className='space-y-6'>
        <h1 className='text-4xl md:text-6xl font-bold text-foreground text-balance leading-tight'>
          Thoughts on design, development, and the web
        </h1>
        <p className='text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed'>
          Exploring the intersection of thoughtful design and robust
          engineering. Join us as we share insights, experiments, and
          discoveries from building digital experiences.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 pt-4'>
          <Button className='px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium'>
            Read Latest
          </Button>
          <Button className='px-6 py-3 border border-border bg-transparent hover:bg-white/80 text-foreground rounded-lg transition-colors font-medium'>
            Browse All
          </Button>
        </div>
      </div>
    </section>
  )
}
