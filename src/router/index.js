import Router from "vue-router"

// We are also using Webpack code splitting here so that each route's associated
// component code is loaded on-demand only when the route is visited.
// When do you use on-demand load? When the view is not one of the important one. When a route is important? You decide

let routes = []

import Home from "views/Home"
import Department from "views/Department"
import Course from "views/Course"
import EditChapter from "views/EditChapter"
import Courses from "views/Courses"
import Page from "views/Page"
const EditPage = () => import("views/EditPage")

routes = routes.concat([
	{ path: "/", component: Home, name: "Home" },
	{ path: "/d/:departmentName", component: Department, name: "Department" },
	{ path: "/c", component: Courses, name: "Courses" },
	{ path: "/c/:courseName", component: Course, name: "Course" },
	{ path: "/c/:courseName/:chapterName/edit", component: EditChapter, name: "EditChapter" },
	{ path: "/p/:pageTitle/edit", component: EditPage, name: "EditPage" },
	{ path: "/p/:pageTitle", component: Page, name: "Page" }
])

if (process.env.NODE_ENV !== "production") {
	const Showcase = () => import("views/dev/Showcase") // load dynamically when needed
	const Login = () => import("views/dev/Login")

	routes.push({ path: "/showcase", component: Showcase })
	routes.push({ path: "/login", component: Login })
}

const UIDemo = () => import("views/dev/UIDemo")
const UIDemoComponentsList = () => import("views/dev/ui/ComponentsList")
const UIDemoButton = () => import("views/dev/ui/Button")
const UIDemoDialog = () => import("views/dev/ui/Dialog")
const UIDemoAsync = () => import("views/dev/ui/Async")
const UIDemoInput = () => import("views/dev/ui/Input")
const UIDemoField = () => import("views/dev/ui/Field")
routes.push({
	path: "/uidemo", component: UIDemo,
	children: [
		{ path: "", component: UIDemoComponentsList },
		{ path: "button", component: UIDemoButton },
		{ path: "dialog", component: UIDemoDialog },
		{ path: "async", component: UIDemoAsync },
		{ path: "input", component: UIDemoInput },
		{ path: "field", component: UIDemoField }
	]
})

const NotFound = () => import("views/NotFound")
routes.push({ path: "/404", component: NotFound, name: "NotFound" })

// push as last element because the wildcard match will catch all the unknown urls
routes.push({ path: "*", component: NotFound })

export function createRouter() {
	return new Router({
		mode: "history",
		scrollBehavior: () => ({ y: 0 }),
		routes
	})
}
