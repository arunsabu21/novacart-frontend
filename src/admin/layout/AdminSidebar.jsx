import { useState } from "react";
import {
  MdDashboard,
  MdApi,
  MdSchema,
  MdToken,
  MdSettings,
  MdPeople,
  MdSecurity,
  MdFilterList,
  MdSpeed,
  MdMenuOpen,
  MdMenu,
  MdChevronRight,
  MdLogout,
  MdDarkMode,
} from "react-icons/md";

import styles from "./AdminSidebar.module.css";

const NAV = [
  {
    section: "Overview",
    items: [
      { icon: <MdDashboard />, label: "Dashboard" },
    ],
  },
  {
    section: "API",
    items: [
      {
        icon: <MdApi />,
        label: "Endpoints",
        children: [
          { label: "Router List" },
          { label: "URL Patterns" },
          { label: "Versioning" },
        ],
      },
      { icon: <MdSchema />, label: "Serializers" },
      { icon: <MdFilterList />, label: "Filters & Search", badge: "3" },
      { icon: <MdSpeed />, label: "Throttling" },
    ],
  },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [activeItem, setActiveItem] = useState("Dashboard");

  const toggleSubmenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside
      className={`${styles.sidebar} ${
        collapsed ? styles.collapsed : ""
      }`}
    >
      {/* Header */}
      <div className={styles.sidebarHeader}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>NC</div>
          {!collapsed && (
            <div className={styles.brandText}>
              <div className={styles.brandName}>NovaCart</div>
              <div className={styles.brandSub}>Admin Panel</div>
            </div>
          )}
        </div>

        <button
          className={styles.toggleBtn}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MdMenuOpen /> : <MdMenu />}
        </button>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {NAV.map((section, si) => (
          <div key={si}>
            {!collapsed && (
              <div className={styles.sectionLabel}>
                {section.section}
              </div>
            )}

            {section.items.map((item) => (
              <div key={item.label}>
                <div
                  className={`${styles.navItem} ${
                    activeItem === item.label ? styles.active : ""
                  }`}
                  onClick={() => {
                    setActiveItem(item.label);
                    if (item.children)
                      toggleSubmenu(item.label);
                  }}
                >
                  <span className={styles.icon}>
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <span className={styles.label}>
                      {item.label}
                    </span>
                  )}

                  {item.badge && !collapsed && (
                    <span className={styles.badge}>
                      {item.badge}
                    </span>
                  )}

                  {item.children && !collapsed && (
                    <MdChevronRight
                      className={`${styles.arrow} ${
                        openMenus[item.label]
                          ? styles.open
                          : ""
                      }`}
                    />
                  )}
                </div>

                {item.children && openMenus[item.label] && !collapsed && (
                  <div className={styles.submenu}>
                    {item.children.map((child) => (
                      <div
                        key={child.label}
                        className={styles.submenuItem}
                        onClick={() =>
                          setActiveItem(child.label)
                        }
                      >
                        {child.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.userCard}>
          <div className={styles.avatar}>AD</div>
          {!collapsed && (
            <div className={styles.userInfo}>
              <div>Admin User</div>
              <small>superuser</small>
            </div>
          )}
          <button className={styles.logoutBtn}>
            <MdLogout />
          </button>
        </div>
      </div>
    </aside>
  );
}
