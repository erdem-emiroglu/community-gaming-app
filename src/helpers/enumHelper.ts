export enum Filter {
  Initial = "&_sort=lastUpdateDate&_order=desc",
  Descending = "&_sort=points,lastUpdateDate&_order=desc,desc",
  Ascending = "&_sort=points,lastUpdateDate&_order=asc,desc",
}