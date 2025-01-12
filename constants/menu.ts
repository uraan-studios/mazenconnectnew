import {
    Home,
    User,
    GraduationCap,
    FileCheck2Icon,
    Building2,
    BellDot
  } from "lucide-react";
  
  export const menu = {
    home: [
      {
        name: "Dashboard",
        path: "/",
        icon: Home,
        secure: false,
        submenu: []
      }
    ],
    manage: [
      {
        name: "Employees",
        path: "/employees",
        icon: User,
        secure: false,
        submenu: [
          {
            name: "Add Employee",
            path: "/employees/add-employees",
            secure: false
          },
          {
            name: "Manage Roles",
            path: "/employees/roles",
            secure: true
          },
          {
            name: "Add Role",
            path: "/employees/add-roles",
            secure: true
          }
        ]
      },
      {
        name: "Classes",
        path: "/classes",
        icon: GraduationCap,
        secure: false,
        submenu: [
          {
            name: "Add Class",
            path: "/classes/add",
            secure: false
          },
        ]
      }
    ],
    report: [
      {
        name: "Principal Report",
        path: "/principal-report",
        icon: FileCheck2Icon,
        secure: false,
        submenu: [
          {
            name: "Add Principal Report",
            path: "/principal-report/add",
            secure: false
          }
        ]
      }
    ],
    campus: [
      {
        name: "Manage Campus",
        path: "/campus",
        icon: Building2,
        secure: true,
        submenu: [
          {
            name: "Add Campus",
            path: "/campus/add",
            secure: true
          }
        ]
      },
      {
        name: "Notification",
        path: "/notification",
        icon: BellDot,
        secure: true,
        submenu: []
      }
    ]
  };
  