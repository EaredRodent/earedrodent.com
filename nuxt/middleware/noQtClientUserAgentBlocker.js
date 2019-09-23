import config from '@/config/config'

export default async function ({ store: { commit }, req, route, redirect }) {
  if (req.headers['user-agent'] !== 'DSO_QuickLauncher') {
    return redirect(config.PAGES.PAGE_Base_Forbidden.url)
  }
}
