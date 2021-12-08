import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'gray.800',
        height: '100%'
      }
    }
  },
  fonts: {
    body: 'Roboto',
    heading: 'Roboto'
  }
})