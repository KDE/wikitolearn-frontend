import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

// We are also using Webpack code splitting here so that each route's associated
// component code is loaded on-demand only when the route is visited.
// When do you use on-demand load? When the view is not one of the important one. When a route is important? You decide
// include these views in the main bundle
import Home from "views/Home"
import Department from "views/Department"
import Course from "views/Course"
import Page from "views/Page"

const NotFound = () => System.import("views/NotFound") // load dynamically when needed

let routes = []

if (process.env.NODE_ENV !== "production") {
	const Showcase = () => System.import("views/dev/Showcase")
	const UIDemo = () => System.import("views/dev/UIDemo")
	routes.push({ path: "/showcase", component: Showcase })
	routes.push({ path: "/uidemo", component: UIDemo })
}

routes = routes.concat([
	{ path: "/", component: Home, name: "Home" },
	{ path: "/d/:departmentName", component: Department, name: "Department" },
	{ path: "/c/:courseName", component: Course, name: "Course" },
	{ path: "/p/:pageTitle(.+)", component: Page, name: "Page" }
])

// push as last element because the wildcard match will catch all the unknown urls
routes.push({ path: "*", component: NotFound })

export function createRouter() {
	return new Router({
		mode: "history",
		scrollBehavior: () => ({ y: 0 }),
		routes
	})
}
