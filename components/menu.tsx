'use client'
import { useEffect, useState } from 'react'
import { formatPrice, menuItems, type MenuCategory } from '@/data/restaurant'

type Filter = 'all' | MenuCategory
const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'همهٔ غذاها' },
  { id: 'kebab', label: 'کباب‌ها' },
  { id: 'kateh', label: 'کته‌ها' },
]

export function Menu() {
  const [filter, setFilter] = useState<Filter>('all')
  const [highlighted, setHighlighted] = useState<string | null>(null)
  useEffect(() => {
    function followFoodLink() {
      const id = window.location.hash.slice(1)
      if (!menuItems.some((item) => item.id === id)) return
      setFilter('all')
      setHighlighted(id)
      // Restore hidden rows before scrolling to a link from a featured food.
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          document
            .getElementById(id)
            ?.scrollIntoView({
              block: 'center',
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                .matches
                ? 'instant'
                : 'smooth',
            }),
        ),
      )
    }
    followFoodLink()
    window.addEventListener('hashchange', followFoodLink)
    return () => window.removeEventListener('hashchange', followFoodLink)
  }, [])
  const visibleItems = menuItems.filter(
    (item) => filter === 'all' || item.category === filter,
  )
  return (
    <>
      <div className="menu-toolbar">
        <div className="menu-filters" role="group" aria-label="دسته‌بندی غذاها">
          {filters.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={filter === item.id}
              aria-controls="menu-items"
              onClick={() => {
                setFilter(item.id)
                setHighlighted(null)
                if (menuItems.some((food) => food.id === window.location.hash.slice(1))) {
                  window.history.replaceState(null, '', '#menu')
                }
              }}
            >
              {item.label}
              <span>
                {new Intl.NumberFormat('fa-IR').format(
                  item.id === 'all'
                    ? menuItems.length
                    : menuItems.filter((food) => food.category === item.id)
                        .length,
                )}
              </span>
            </button>
          ))}
        </div>
        <span className="price-unit">قیمت‌ها به تومان</span>
      </div>
      <p className="sr-only" role="status">
        {new Intl.NumberFormat('fa-IR').format(visibleItems.length)} غذا نمایش
        داده می‌شود
      </p>
      <div className="menu-items" id="menu-items">
        {visibleItems.map((item) => (
          <article
            className={`menu-item ${highlighted === item.id ? 'is-highlighted' : ''}`}
            key={item.id}
            id={item.id}
          >
            <div className="menu-item-copy">
              <div className="menu-item-name">
                <h3>{item.name}</h3>
                {item.tag && <span className="food-tag">{item.tag}</span>}
              </div>
              <p>{item.description}</p>
            </div>
            <span className="menu-price">
              <b>{formatPrice(item.price)}</b>
              <span>تومان</span>
            </span>
          </article>
        ))}
      </div>
    </>
  )
}
