import type { Country, CountryGroup } from "@/types";

/**
 * 목록 그룹 (배열 순서 = 화면 노출 순서)
 * OPENED: global, IN, BR, AU, DE, SA(sa·sa_en) · GROUP1: th~pl · GROUP2: ph~ca
 */
export const countryGroups: CountryGroup[] = [
  { id: "opened", label: "OPENED", defaultExpanded: false },
  { id: "group1", label: "GROUP1", defaultExpanded: true },
  { id: "group2", label: "GROUP2", defaultExpanded: true },
];

/**
 * 국가 시드
 * - 주석 `locale → Admin countryCode` 형식 (uk → gb는 Site locale uk, Admin gb)
 * - ca: locales ca_en, ca_fr · sa: locales sa, sa_en
 */
export const countries: Country[] = [
  // --- OPENED: global, IN, BR, AU, DE, SA ---
  {
    id: "global",
    name: "Global",
    countryCode: "global",
    localeCode: "global",
    nameAliases: ["Global", "글로벌"],
    groupId: "opened",
  },
  {
    id: "in",
    name: "India",
    countryCode: "in",
    localeCode: "in",
    nameAliases: ["IN", "인도", "India"],
    groupId: "opened",
  },
  {
    id: "br",
    name: "Brazil",
    countryCode: "br",
    localeCode: "br",
    nameAliases: ["BR", "브라질", "Brazil"],
    groupId: "opened",
  },
  {
    id: "au",
    name: "Australia",
    countryCode: "au",
    localeCode: "au",
    nameAliases: ["AU", "호주", "Australia"],
    groupId: "opened",
  },
  {
    id: "de",
    name: "Germany",
    countryCode: "de",
    localeCode: "de",
    nameAliases: ["DE", "독일", "Germany"],
    groupId: "opened",
  },
  {
    id: "sa",
    name: "Saudi Arabia",
    countryCode: "sa",
    localeCode: "sa",
    locales: [
      { localeCode: "sa", label: "SA" },
      { localeCode: "sa_en", label: "EN" },
    ],
    nameAliases: ["SA", "사우디", "Saudi Arabia"],
    groupId: "opened",
  },
  // --- GROUP1: th ~ pl ---
  {
    id: "th",
    name: "Thailand",
    countryCode: "th",
    localeCode: "th",
    nameAliases: ["TH", "태국", "Thailand"],
    groupId: "group1",
  },
  {
    id: "gb",
    name: "United Kingdom",
    countryCode: "gb",
    localeCode: "uk",
    nameAliases: ["UK", "GB", "영국", "United Kingdom"],
    groupId: "group1",
  },
  {
    id: "fr",
    name: "France",
    countryCode: "fr",
    localeCode: "fr",
    nameAliases: ["FR", "프랑스", "France"],
    groupId: "group1",
  },
  {
    id: "pa",
    name: "Panama",
    countryCode: "pa",
    localeCode: "pa",
    nameAliases: ["PA", "파나마", "Panama"],
    groupId: "group1",
  },
  {
    id: "mx",
    name: "Mexico",
    countryCode: "mx",
    localeCode: "mx",
    nameAliases: ["MX", "멕시코", "Mexico"],
    groupId: "group1",
  },
  {
    id: "co",
    name: "Colombia",
    countryCode: "co",
    localeCode: "co",
    nameAliases: ["CO", "콜롬비아", "Colombia"],
    groupId: "group1",
  },
  {
    id: "tr",
    name: "Türkiye",
    countryCode: "tr",
    localeCode: "tr",
    nameAliases: ["TR", "튀르키예", "Turkey", "Türkiye"],
    groupId: "group1",
  },
  {
    id: "pl",
    name: "Poland",
    countryCode: "pl",
    localeCode: "pl",
    nameAliases: ["PL", "폴란드", "Poland"],
    groupId: "group1",
  },
  // --- GROUP2 ---
  {
    id: "ph",
    name: "Philippines",
    countryCode: "ph",
    localeCode: "ph",
    nameAliases: ["PH", "필리핀", "Philippines"],
    groupId: "group2",
  },
  {
    id: "za",
    name: "South Africa",
    countryCode: "za",
    localeCode: "za",
    nameAliases: ["ZA", "남아공", "South Africa"],
    groupId: "group2",
  },
  {
    id: "pe",
    name: "Peru",
    countryCode: "pe",
    localeCode: "pe",
    nameAliases: ["PE", "페루", "Peru"],
    groupId: "group2",
  },
  {
    id: "ma",
    name: "Morocco",
    countryCode: "ma",
    localeCode: "ma",
    nameAliases: ["MA", "모로코", "Morocco"],
    groupId: "group2",
  },
  {
    id: "vn",
    name: "Vietnam",
    countryCode: "vn",
    localeCode: "vn",
    nameAliases: ["VN", "베트남", "Vietnam"],
    groupId: "group2",
  },
  {
    id: "pt",
    name: "Portugal",
    countryCode: "pt",
    localeCode: "pt",
    nameAliases: ["PT", "포르투갈", "Portugal"],
    groupId: "group2",
  },
  {
    id: "id",
    name: "Indonesia",
    countryCode: "id",
    localeCode: "id",
    nameAliases: ["ID", "인도네시아", "Indonesia"],
    groupId: "group2",
  },
  {
    id: "ca",
    name: "Canada",
    countryCode: "ca",
    localeCode: "ca_en",
    locales: [
      { localeCode: "ca_en", label: "EN" },
      { localeCode: "ca_fr", label: "FR" },
    ],
    nameAliases: ["CA", "Canada", "캐나다"],
    groupId: "group2",
  },
];
