const ExampleComponent = () => {
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="mb-4 text-2xl font-semibold text-primary">
        Example Component
      </h2>
      <p className="mb-2 text-muted-foreground">
        This is an example component demonstrating the folder structure.
      </p>
      <p className="text-muted-foreground">
        You can import components using absolute paths:{' '}
        <code className="rounded bg-muted px-2 py-1 text-sm font-mono">
          @/components/...
        </code>
      </p>
      <div className="mt-4 flex gap-2">
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          Primary Button
        </button>
        <button className="rounded-md border border-border bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80">
          Secondary Button
        </button>
      </div>
    </div>
  )
}

export default ExampleComponent
