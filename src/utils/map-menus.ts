import { RouteRecordRaw } from 'vue-router'

import { IBreadcrumds } from '@/base-ui/breadcrumb'

let firstMenu: any = null

export function mapMenusToRoutes(suerMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  //1.获取所有的路由
  const allRoutes: RouteRecordRaw[] = []
  // require.context是webpack函数
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  //根据菜单的路由筛选符合权限的路由
  console.log(allRoutes)
  const registrationRouter = (menu: any[]) => {
    menu.forEach((el) => {
      if (el.type === 2) {
        const needRoute = allRoutes.find((item) => item.path === el.url)
        if (needRoute) {
          routes.push(needRoute)
        }
        if (!firstMenu) {
          firstMenu = el
        }
      } else {
        registrationRouter(el.children)
      }
    })
  }
  registrationRouter(suerMenus)

  return routes
}

interface Imenus {
  children: any
  id: number
  name: string
  parentId: number
  type: number
  url: string
}

export function currentBreadcumb(menus: Imenus[], path: string) {
  const breadcrumb: IBreadcrumds[] = []
  pathToMenuId(menus, path, breadcrumb)
  return breadcrumb
}

export function pathToMenuId(
  menus: Imenus[],
  path: string,
  breadcrumb?: IBreadcrumds[]
): any {
  for (const el of menus) {
    if (el.type === 1) {
      const currentEl = pathToMenuId(el.children ?? [], path)
      if (currentEl) {
        breadcrumb?.push({ name: el.name, path: el.url })
        breadcrumb?.push({ name: currentEl.name, path: currentEl.url })
        return currentEl
      }
    } else if (el.type === 2 && el.url === path) {
      return el
    }
  }
}

export { firstMenu }
