export type AnalyticsCardTypes = {
  title: string;
  subTitle?: string;
  count: number | null;
  isFetching: boolean;
  scope?: string;
  start?: string | undefined;
  end?: string | undefined;
};
