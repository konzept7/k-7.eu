import { Group, Portal, createStyles, Title, useMantineTheme, Text, Stack, Divider, Anchor, Space } from '@mantine/core';
import { IconBrandFacebook, IconBrandGithub, IconExternalLink } from '@tabler/icons';
import LogoBlack from "../../assets/logo/logo_transparent.svg"
import LogoWhite from "../../assets/logo/logo_flat_white_transparent.svg"
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme) => ({
  portalHeader: {
    fontFamily: 'Kufam'
  },
  wrapper: {

  }
}));

export default function K7Portal() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { t } = useTranslation();

  return (
    <Portal>
      <Divider />
      <Group position='apart' p={theme.spacing.xl * 2}>
        <>
          <Stack spacing={4} align="flex-start">
            <img src={theme.colorScheme === 'light' ? LogoBlack : LogoWhite} alt="K7 Logo" height={40} />
            <Space h={15} />
            <Title className={classes.portalHeader} lh={1.1} style={{ fontFamily: 'Kufam, sans-serif' }} order={4} my={0}>K7 - Konzept Karlsruhe</Title>
            <Text lh={1.1} color="dimmed" size="sm">Roonstraße 23a, 76137 Karlsruhe</Text>
            <Text lh={1.1} color="dimmed" size="xs">&copy; 2022-{new Date().getFullYear()}</Text>
          </Stack>
        </>
        <Group spacing={theme.spacing.xl * 2} align="flex-start">
          <Stack spacing={4}>
            <Title className={classes.portalHeader} order={5}>{t('aboutUs')}</Title>
            <Link to="imprint"><Text size="sm">{t('imprint')}</Text></Link>
            <Link to="team">
              <Text size="sm">{t('team.team')}</Text>
            </Link>
            <Link to="jobs">
              <Text size="sm">{t('jobs.career')}</Text>
            </Link>
          </Stack>
          <Stack spacing={4}>
            <Title className={classes.portalHeader} order={5}>{t('community')}</Title>
            <Anchor href="https://github.com/konzept7/" target="_blank">
              <Group spacing={2}>
                <IconBrandGithub size={18} stroke={1.5} />
                <Text size="sm">GitHub</Text>
                <IconExternalLink size={18} stroke={1.5} />
              </Group>
            </Anchor>
            <Anchor href="https://facebook.com/konzept7" target="_blank">
              <Group spacing={2}>
                <IconBrandFacebook size={18} stroke={1.5} />
                <Text size="sm">Facebook</Text>
                <IconExternalLink size={18} stroke={1.5} />
              </Group>
            </Anchor>
          </Stack>
        </Group>
      </Group>
    </Portal>
  )
}