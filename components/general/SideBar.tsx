"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { motion } from "framer-motion"
import { CornerDownRightIcon } from "lucide-react"
import { menu } from '@/constants/menu'
import Link from 'next/link'
import Logout from './Logout'

const SideBar = ({isAdmin}: {isAdmin: boolean}) => {
  const path = usePathname()

  // Variants for letter-by-letter reveal animation
  const letterVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  }

  return (
    <>
      <p className="text-xs py-2 opacity-50">Menu</p>
      {menu.map((item, index) => (
        (!item.secure || isAdmin) && ( // Render only if not secure or if isAdmin is true
          <div key={index}>
            <Link href={item.path}>
              {/* Container for the menu item */}
              <motion.div
                initial="hidden"
                animate="visible"
                className={`relative overflow-hidden flex gap-4 items-center hover:bg-primary/5 py-2 px-2 rounded-sm transition-all duration-300 ease-in-out ${path === item.path ? 'bg-primary text-primary-foreground' : ''}`}
              >
                {/* Icon */}
                <item.icon className='h-5 relative z-10' />

                {/* Circular reveal effect */}
                <div className="relative overflow-hidden flex items-center">
                  <motion.div className="flex relative z-10">
                    {item.name.split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={letterVariants}
                        className="relative text-sm font-semibold"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </Link>

            {path.startsWith(item.path) && 
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { height: 0, opacity: 0 },
                  visible: { height: 'auto', opacity: 1, transition: { duration: 0.3 } }
                }}
                className='relative pl-2'
              >
                {item.submenu.map((submenu, subIndex) => (
                  (!submenu.secure || isAdmin) && ( // Render only if submenu is not secure or if isAdmin is true
                    <Link href={submenu.path} key={subIndex}>
                      <div
                        className={`group flex gap-2 items-center hover:bg-primary/5 py-2 px-2 rounded-sm relative ${path.startsWith(submenu.path) ? 'bg-primary text-primary-foreground' : ''}`}
                      >
                        <i className={`absolute left-3 -top-2 w-[1.5px] h-5 bg-card group-hover:opacity-60 transition-opacity duration-200 ${path.startsWith(submenu.path) ? 'opacity-80' : 'opacity-25'}`}></i>
                        <CornerDownRightIcon className={`h-5 group-hover:opacity-70 transition-opacity duration-200 ${path.startsWith(submenu.path) ? 'opacity-100' : 'opacity-25'}`} />
                        <p className={`text-sm font-semibold group-hover:opacity-70 transition-opacity duration-200 ${(path.startsWith(submenu.path)) ? 'opacity-100' : 'opacity-45'}`}>{submenu.name}</p>
                      </div>
                    </Link>
                  )
                ))}
              </motion.div>
            }
          </div>
        )
      ))}

      <Logout/>
    </>
  )
}

export default SideBar
