import { MantineColor } from "@mantine/core"

const headers = {
  accept: 'application/json',
  Authorization: 'Bearer ' + import.meta.env.VITE_BEARER
}

type Status = "In Anfrage" | "Neu" | "Konzept" | "In Bearbeitung" | "Geliefert" | "Abgeschlossen"
type Language =
  | "markup"
  | "bash"
  | "clike"
  | "c"
  | "cpp"
  | "css"
  | "javascript"
  | "jsx"
  | "coffeescript"
  | "actionscript"
  | "css-extr"
  | "diff"
  | "git"
  | "go"
  | "graphql"
  | "handlebars"
  | "json"
  | "less"
  | "makefile"
  | "markdown"
  | "objectivec"
  | "ocaml"
  | "python"
  | "reason"
  | "sass"
  | "scss"
  | "sql"
  | "stylus"
  | "tsx"
  | "typescript"
  | "wasm"
  | "yaml";
export const colorForStatus = (status: Status): MantineColor => {
  switch (status) {
    case "In Anfrage": return "orange"
    case "Neu": return "yellow"
    case "Konzept": return "grape"
    case "In Bearbeitung": return "blue"
    case "Geliefert": return "teal"
    case "Abgeschlossen": return "green"
    default: return "gray"
  }
}

export interface Meta {
  pagination: { page: number; pageSize: number; pageCount: number; total: number }
}
export interface AuthorResponseItem {
  data: {
    id: number
    attributes: {
      name: string
      position: string
      thumbnail?: any
    }
  }
}

export interface MediaItem {
  data: {

    id?: number;
    attributes?: {
      name?: string;
      alternativeText?: string;
      caption?: string;
      width?: number;
      height?: number;
      formats?: any;
      hash?: string;
      ext?: string;
      mime?: string;
      size?: number;
      url?: string;
      previewUrl?: string;
    };
  }
}

export interface ContentFragment {
  id?: number;
  __component?: string;
}
export interface ContentComponentsImage extends ContentFragment {
  image?: MediaItem
  caption?: string;
  renderSize?: "small" | "medium" | "large";
}
export interface ContentFragmentsParagraph extends ContentFragment {
  title?: string;
  content?: string;
  highlight?: boolean;
}
export interface ContentFragmentsQuote extends ContentFragment {
  author?: string;
  quote?: string;
}



export interface ContentFragmentsCodeblock extends ContentFragment {
  lang?: Language;
  caption?: string;
  code?: string;
}
export interface ContentFragmentsIlluminatingSection extends ContentFragment {
  title?: string;
  topic?: string;
  description?: string;
  icon?: string;
  color?: MantineColor;
  gradientColor?: MantineColor;
}

export interface ContentFragmentsDidYouKnow extends ContentFragment {
  title?: string;
  text?: string;
  icon?: string
  color?: string;
  source?: string;
}

export interface ContentFragmentsFeatureCard extends ContentFragment {
  text?: string;
  link?: string;
  linkLabel?: string;
  image?: MediaItem
}

export interface ContentFragmentsSplitCard extends ContentFragment {
  items?: ContentFragmentsFeatureCard[]
}

export interface SkillListResponse {
  data?: SkillListResponseDataItem[];
  meta?: { pagination?: { page?: number; pageSize?: number; pageCount?: number; total?: number } };
}
export interface Technology {
  id?: number;
  attributes?: {
    name?: string;
    level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    certification?: string;
    keywords?: string;
    highlight?: boolean;
    description?: string;
  };
}
export interface Skill {
  title?: string;
  description?: string;
  icon?: MediaItem
  relevance?: number;
  technologies?: {
    data?: Technology[];
  };
};
export interface SkillListResponseDataItem {
  id?: number;
  attributes?: Skill
}
export interface DepartmentResponseItem {
  id: number;
  attributes: {
    name: string;
    catchphrase: string;
    cover: MediaItem;
    hidden: boolean;
    icon: MediaItem;
    body?: (
      ContentFragmentsCodeblock
      | ContentComponentsImage
      | ContentFragmentsParagraph
      | ContentFragmentsQuote
      | ContentFragmentsIlluminatingSection
      | ContentFragmentsDidYouKnow
      | ContentFragmentsFeatureCard
      | ContentFragmentsSplitCard
    )[];
    tags: string;
    color: MantineColor;
    skills?: SkillListResponse;
    projects?: ListArticleResponse
    route: string;
    createdAt: string;
    updatedAt: string;
    createdBy: { data?: { id?: number; attributes?: object } };
    updatedBy: { data?: { id?: number; attributes?: object } };
    locale: string;
  };
}

export interface DepartmentListResponse {
  data: DepartmentResponseItem[];
  meta: Meta;
}

export interface ListArticleResponseItem {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author?: AuthorResponseItem
  departments?: { data: Array<DepartmentResponseItem> }
  cover: any;
  tags: string;
  locale: string;
  status?: Status;
  hours?: number;
  content?: (
    ContentFragmentsCodeblock
    | ContentComponentsImage
    | ContentFragmentsParagraph
    | ContentFragmentsQuote
    | ContentFragmentsIlluminatingSection
    | ContentFragmentsDidYouKnow
    | ContentFragmentsFeatureCard
    | ContentFragmentsSplitCard
  )[];
}

export interface ListArticleResponse {
  data: {
    id: number
    attributes: ListArticleResponseItem
  }[]
  meta: Meta;
}



type PopulateArticleWith = "departments" | "content" | "author" | "cover"
export type CollectionQueryType = "projects" | "blogs"
export const queryArticles = async (queryType: CollectionQueryType, populate: Array<PopulateArticleWith> = ["author", "content", "cover", "departments"], locale: string = "de", department: string | undefined = undefined) => {

  let queryUrl = `${import.meta.env.VITE_CMS}/api/${queryType}?locale=${locale}&populate=${populate.join("%2C")}`
  if (department) {
    const departmentReq = await fetch(`${import.meta.env.VITE_CMS}/api/departments?locale=${locale}&filters[name][$eqi]=${department}?locale=${locale}`, {
      method: 'GET', headers
    })
    const departmentRes = await departmentReq.json()
    if (departmentRes.data.length !== 0) {
      const departmentId = departmentRes.data[0].id
      queryUrl += `?filters[${department}`
    }

  }
  const request = await fetch(queryUrl, {
    method: 'GET',
    headers
  })
  const data = await request.json()
  const casted = data as ListArticleResponse
  return casted
}

export const getArticleEntry = async (queryType: CollectionQueryType, id: string, locale: string = "de") => {
  const queryUrl = `${import.meta.env.VITE_CMS}/api/${queryType}/${id}?locale=${locale}&populate[0]=author,cover,department,content&populate[1]=content.image&populate[2]=content.image.image?locale=${locale}`
  const request = await fetch(queryUrl, {
    method: 'GET',
    headers
  })
  const response = await request.json() as { data: { attributes: ListArticleResponseItem } }
  return response.data.attributes
}

export const getProject = async (id: string, locale: string = "de") => {
  return await getArticleEntry("projects", id, locale)
}

export const getBlog = async (id: string, locale: string = "de") => {
  return await getArticleEntry("blogs", id, locale)
}


type PopulateDepartmentWith = "body" | "skills" | "cover" | "icon" | "blogs" | "projects"
export const getDepartments = async (populate: Array<PopulateDepartmentWith> = ["cover", "icon"], locale: string = "de") => {
  const populateParams = populate.length > 0 ? `&populate=${populate.join("%2C")}` : ""
  const queryUrl = `${import.meta.env.VITE_CMS}/api/departments?locale=${locale}${populateParams}`
  const request = await fetch(queryUrl, {
    method: 'GET', headers
  })
  const response = await request.json() as DepartmentListResponse
  return response.data
}

export const getDepartment = async (id: string) => {
  const queryUrl = `${import.meta.env.VITE_CMS}/api/departments/${id}?populate[0]=cover,icon&populate[1]=blogs,projects,body`
  const request = await fetch(queryUrl, {
    method: 'GET', headers
  })
  const response = await request.json() as { data: { attributes: DepartmentResponseItem } }
  return response.data.attributes
}

export const getDepartmentByRoute = async (route: string, locale: string = "de") => {
  const queryUrl = `${import.meta.env.VITE_CMS}/api/departments?locale=${locale}&populate[0]=cover,skills,icon&populate[1]=skills.technologies,skills.icon,blogs,projects.author,projects.cover,projects.departments,body&filters[route][$eqi]=${route}`
  const request = await fetch(queryUrl, {
    method: 'GET', headers
  })
  const response = await request.json() as DepartmentListResponse
  if (response.data.length !== 0) return response.data[0]
  return undefined
}