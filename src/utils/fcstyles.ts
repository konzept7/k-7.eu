import { createStyles } from "@mantine/core";

const fcStyles = createStyles((theme) => ({
  text: {
    lineHeight: 1.2,
    fontFamily: 'Krub, sans-serif',
    fontSize: "1.4rem",
    fontWeight: 200,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      fontSize: '1.2rem',
    },
  },
  keyword: {
    fontWeight: 700,
  },
  padded: {
    padding: 50,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      padding: 15,
    },
  },
  wrapper: {
    padding: 50,
    maxWidth: 1050,
    backgroundColor: theme.colors.brand[8] + ' !important',
    width: "100%",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      padding: 15,
    },
  },
  image: {
    opacity: 0,
    transform: "translateY(20px)",
    transitionDely: '750ms',
    transition: "opacity .7s cubic-bezier(0.16, 1, 0.3, 1),transform .7s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  imageUp: {
    opacity: 1,
    transform: "scale(1) translateY(0)",
  }
}));

export default fcStyles;