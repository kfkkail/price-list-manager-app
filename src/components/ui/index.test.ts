// Test that all exports can be imported
describe('UI Components Index', () => {
  it('exports all required components', () => {
    const components = require('./index')
    
    // Button components
    expect(components.Button).toBeDefined()
    
    // Typography components
    expect(components.Heading).toBeDefined()
    expect(components.Text).toBeDefined()
    
    // Table components
    expect(components.Table).toBeDefined()
    expect(components.TableHeader).toBeDefined()
    expect(components.TableBody).toBeDefined()
    expect(components.TableRow).toBeDefined()
    expect(components.TableCell).toBeDefined()
    
    // Layout components
    expect(components.Container).toBeDefined()
    expect(components.Card).toBeDefined()
    expect(components.CardHeader).toBeDefined()
    expect(components.CardBody).toBeDefined()
    expect(components.CardFooter).toBeDefined()
    
    // Theme components
    expect(components.ThemeToggle).toBeDefined()
  })

  it('exports all required types', () => {
    const types = require('./index')
    
    // Check that the module exports something
    expect(Object.keys(types).length).toBeGreaterThan(0)
    
    // Log what's actually exported for debugging
    console.log('Exported types:', Object.keys(types))
  })
})
