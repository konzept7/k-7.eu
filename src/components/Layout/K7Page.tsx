import { Center, Container, createStyles, Stack, useMantineTheme } from "@mantine/core";

interface K7PageProps {
  children: React.ReactNode;
  background?: "dark" | "light";
  py?: number;
}

export default function K7Page({ children, background = "dark", py = 80 }: K7PageProps) {
  const theme = useMantineTheme();
  return (
    <Center py={py} w="100%" style={{
      backgroundColor: background === 'light' ? theme.colors.brand[1] : theme.colors.brand[9],
      boxShadow: background === 'light' ? `inset 0px 11px 18px -10px ${theme.colors.brand[9]}, inset 0px -11px 18px -10px ${theme.colors.brand[9]}` : undefined,
    }}>
      <Container maw={1250} w="100%" px={20}>
        {children}
      </Container>
    </Center>
  )
}