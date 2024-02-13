// import UserProfile from 'src/providers/user-provider';


import SvgColor from 'src/components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

// const { is_authenticated } = UserProfile.is_authenticated; // Assuming your user data contains authentication information

const navConfig = [
  {
    title: 'dashboard',
    icon: icon('ic_analytics'),
    subMenus: [
      { title: 'Overview', path: '/' },
      { title: 'Perfomance', path: '/dashboard2' },
    ],
  },
  {
    title: 'MOBILES',
    icon: icon('ic_user'),
    subMenus: [
      { title: 'Airtime', path: '/MOBILE' },
      { title: 'B2B', path: '/MOBILE' },
      { title: 'C2B', path: '/MOBILE' },
      { title: 'B2C', path: '/MOBILE' },
     
    ],
  },
  {
    title: 'CARDS',
    icon: icon('ic_user'),
    subMenus: [
      { title: 'Interchange GL', path: '/cards' },
      { title: 'Outgoing Suspense', path: '/cards' },
      { title: 'Merchant Payables', path: '/cards' },
      { title: 'Incoming Charge back', path: '/cards' },
      { title: 'Outgoing Charge Back', path: '/cards' },
      { title: 'Inter Country', path: '/cards' },
      { title: 'User Groups', path: '/user2' },
    ],
  },
  {
    title: 'CONTROL GLs',
    icon: icon('cog'),
    subMenus: [
      { title: 'Pesalink', path: '' },
      { title: 'Taxes and Levies', path: '' },
      { title: 'Suspense GLs', path: '' },
      { title: 'Proxy GL', path: '' },
      { title: 'Batch Proofing', path: '' },
    ],
  },
  {
    title: 'IMT',
    icon: icon('ic_cart'),
    subMenus:[
      { title: 'MoneyGram', path: '' },
      { title: 'Western Union', path: '' },
      { title: 'Paypal', path: '' },
      { title: 'Hello Paisa', path: '' },
      { title: 'Transfast', path: '' },
      { title: 'Mastercard Send', path: '' },
    ],
  },
  {
    title: 'Settings',
    path: '/products',
    icon: icon('ic_lock'),
  },
]

export default navConfig;
