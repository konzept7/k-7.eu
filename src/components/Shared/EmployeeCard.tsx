import { Text, createStyles, Avatar, Group } from "@mantine/core";
import { AuthorResponseItem } from "../../utils/queryCms";

const useStyles = createStyles((theme) => ({
  avatar: {
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

  const { classes, theme } = useStyles();
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