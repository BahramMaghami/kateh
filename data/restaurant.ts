export type MenuCategory = 'kebab' | 'kateh'
export type MenuItem = {
  id: string
  name: string
  category: MenuCategory
  description: string
  price: number
  tag?: string
}

// Prices in toman, transcribed from the supplied menu; confirm before launch.
export const menuItems: MenuItem[] = [
  {
    id: 'lean-chenjeh',
    name: 'چنجه گوساله کم‌چرب',
    category: 'kebab',
    description: '۲۰۰ گرم راستهٔ گوساله',
    price: 910000,
  },
  {
    id: 'chenjeh',
    name: 'چنجه گوساله چرب',
    category: 'kebab',
    description: '۲۰۰ گرم راستهٔ گوساله',
    price: 895000,
  },
  {
    id: 'sour-chenjeh',
    name: 'کباب چنجه ترش',
    category: 'kebab',
    description: '۲۴۰ گرم راستهٔ گوساله، رب انار، گردو و سبزیجات',
    price: 935000,
    tag: 'طعم گیلان',
  },
  {
    id: 'koobideh',
    name: 'کباب کوبیده',
    category: 'kebab',
    description: '۱۱۰ گرم سردست گوساله و قلوه‌گاه گوسفندی',
    price: 255000,
  },
  {
    id: 'loghmeh',
    name: 'کباب لقمه',
    category: 'kebab',
    description: '۱۷۰ گرم سردست گوساله و قلوه‌گاه گوسفندی',
    price: 395000,
  },
  {
    id: 'saffron-chicken',
    name: 'جوجه‌کباب زعفرانی',
    category: 'kebab',
    description: '۲۰۰ گرم سینهٔ مرغ',
    price: 495000,
  },
  {
    id: 'sour-chicken',
    name: 'جوجه‌کباب ترش',
    category: 'kebab',
    description: '۲۴۰ گرم سینهٔ مرغ، رب انار، گردو و سبزیجات',
    price: 575000,
  },
  {
    id: 'kebab-bowl',
    name: 'کاسه کباب',
    category: 'kebab',
    description: 'چنجه، جوجه و کوبیده، همراه سس کره',
    price: 1700000,
    tag: 'دونفره',
  },
  {
    id: 'gamaj-kebab',
    name: 'کباب گمجی',
    category: 'kebab',
    description: 'کباب چنجه در ظرف گمج',
    price: 1015000,
  },
  {
    id: 'rice',
    name: 'برنج کته',
    category: 'kateh',
    description: '۴۰۰ گرم برنج هاشمی درجه‌یک',
    price: 255000,
  },
  {
    id: 'local-kateh',
    name: 'کته کباب محلی',
    category: 'kateh',
    description: 'کته کباب محلی با زیتون پرورده و مخلفات گیلانی',
    price: 1945000,
    tag: 'طعم گیلان',
  },
  {
    id: 'toodali-polo',
    name: 'کته تودلی پلو',
    category: 'kateh',
    description: 'یک سیخ چنجه، مخلوط و دم‌کشیده با کته',
    price: 1245000,
  },
  {
    id: 'beans-chenjeh',
    name: 'کته لوبیا چنجه',
    category: 'kateh',
    description: 'یک سیخ چنجه، یک کاسه لوبیا و برنج زعفرانی',
    price: 1360000,
  },
  {
    id: 'beans-koobideh',
    name: 'کته لوبیا کوبیده',
    category: 'kateh',
    description: 'یک سیخ کوبیده، یک کاسه لوبیا و برنج زعفرانی',
    price: 760000,
  },
]

type Restaurant = {
  address: string | null
  hours: string | null
  phone: string | null
  mapUrl: string | null
  instagramUrl: string | null
}
// Add verified details here; missing values never produce dummy links.
export const restaurant: Restaurant = {
  address: null,
  hours: null,
  phone: null,
  mapUrl: null,
  instagramUrl: null,
}
export const formatPrice = (price: number) =>
  new Intl.NumberFormat('fa-IR').format(price)
