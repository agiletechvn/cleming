import I18n from '~/ui/I18n'
export default { 
  listItems: [
    {
      name: I18n.t('manage_account'),
      route: 'userManagement',
      // icon: 'poll',
    },
    {
        name: I18n.t('about'),
        route: 'about',
    },
  ]


}