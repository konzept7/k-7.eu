import { Text, createStyles, Group, Stack, Badge, Title, ThemeIcon } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ContentFragmentsDidYouKnow } from "../../utils/queryCms";

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "100%",
    maxWidth: 600,
    margin: "auto",
  },
  badge: {
    fontSize: "0.8rem",
    padding: "0 10.5px",
    lineHeight: 18,
    backgroundColor: theme.colors.white,
    borderBottom: "0.35em solid",
    borderRadius: theme.radius.sm,
    borderLeft: "0.1em solid",
    borderRight: "0.1em solid",
    borderTop: "0.1em solid",
  },
  title: {
    fontFamily: 'Karla, sans-serif',
  }
}));
export default function DidYouKnowFragment(fragment: ContentFragmentsDidYouKnow) {
  const { t } = useTranslation();
  const { classes, cx, theme } = useStyles();
  return (
    <Group my={30} px={10} noWrap align="flex-start" className={classes.wrapper} spacing="xs">
      <i className={'ti ti-' + fragment.icon} style={{ color: theme.colors[fragment.color!][7], fontSize: 32 }} />
      <Stack align="flex-start">
        <div className={classes.badge} style={{ borderColor: theme.colors[fragment.color!][7] }}><Text color={fragment.color}>{t('didYouKnow')}</Text></div>
        <Title className={classes.title} my={0} lh={1} color={fragment.color}>{fragment.title}</Title>
        <Text color={fragment.color}>{fragment.text}{fragment.source && <Text fw={700} component="a" href={fragment.source}><sup>&nbsp;Quelle</sup></Text>}</Text>
      </Stack>
    </Group>
  )
}