import { Card, Stack, Image, Text, createStyles, Avatar, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { AuthorResponseItem } from "../../utils/queryCms";

const useStyles = createStyles((theme) => ({
  avatar: {
    border: `4px solid ${theme.colors.brand[5]}`,
  },

  name: {
    fontFamily: `Krub, ${theme.fontFamily}`,
    letterSpacing: 1.5
  },
  bio: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  }
}));

export default function EmployeeCard({ attributes }: AuthorResponseItem) {
  const { t } = useTranslation();
  const { classes, theme } = useStyles();
  const mediumDisplay = useMediaQuery('(min-width: 500px)');
  const { thumbnail, bio, name, position } = attributes

  const thumbnailUrl = thumbnail?.data?.attributes?.formats?.thumbnail?.url !== undefined ? import.meta.env.VITE_CMS + thumbnail.data.attributes.formats.thumbnail.url : undefined

  return (
    <Group noWrap maw={650}>
      <Avatar className={classes.avatar} src={thumbnailUrl} size={120} radius="lg" />
      <div>
        <Text size="sm" sx={{ textTransform: 'uppercase' }} weight={700}>
          {position}
        </Text>

        <Text color={theme.white} size="lg" weight={700} className={classes.name}>
          {name}
        </Text>

        <Text size="sm" color="dimmed" className={classes.bio}>
          {bio}
        </Text>
      </div>
    </Group>
  );
}