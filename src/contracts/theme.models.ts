
interface Color {
  banner: {
    background: {
      high: string,
      low: string,
      top: string,
      bottom: string,
    },
    foreground: {
      base: string,
      strong: string,
    },
    control: {
      background: string,
      base: string,
    },
    boxShadow: string,
  },
  background: {
    base: string,
    paper: string,
  },
  foreground: {
    base: string,
  },
  control: {
    base: string,
  },
}

interface Icon {
  check: string,
  minus: string,
  user: string,
  monitor: string,
  sun: string,
  moon: string,
}

export type { Icon, Color };
