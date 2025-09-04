import React from 'react'
import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from '../src/contexts/ThemeContext'
import '../src/index.css'

const preview: Preview = {
  parameters: {},
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;