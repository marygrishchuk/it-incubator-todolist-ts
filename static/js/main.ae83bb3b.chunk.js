(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{102:function(e,t,a){e.exports=a(130)},107:function(e,t,a){},130:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),i=a.n(c);a(107),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o,l,s=a(81),u=a.n(s),d=a(173),m=a(174),f=a(165),b=a(132),E=a(169),O=a(176),p=a(177),g=a(175),T=a(182),h=a(179),j=a(13),v=a(7),S=a(83),k={withCredentials:!0,headers:{"API-KEY":"199df811-bd09-48a1-81bc-ca38857c74a2"}},y=a.n(S).a.create(Object(v.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},k));!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(o||(o={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.High=2]="High",e[e.Urgent=3]="Urgent",e[e.Later=4]="Later"}(l||(l={}));var I=function(){return y.get("todo-lists")},C=function(e){return y.post("todo-lists",{title:e})},L=function(e,t){return y.put("todo-lists/".concat(e),{title:t})},A=function(e){return y.delete("todo-lists/".concat(e))},w=function(e){return y.get("todo-lists/".concat(e,"/tasks"))},D=function(e,t){return y.post("todo-lists/".concat(e,"/tasks"),{title:t})},N=function(e,t,a){return y.put("todo-lists/".concat(e,"/tasks/").concat(t),a)},P=function(e,t){return y.delete("todo-lists/".concat(e,"/tasks/").concat(t))},R=function(){return y.get("auth/me")},G=function(e){return y.post("auth/login",e)},K=function(e,t){e.messages.length?t(M(e.messages[0])):t(M("Some error occurred")),t(F("failed"))},_=function(e,t){t(M(e.message)),t(F("failed"))},U={isLoggedIn:!1},x=function(e){return{type:"login/SET-IS-LOGGED-IN",value:e}},H={status:"idle",error:null},F=function(e){return{type:"APP/SET-STATUS",status:e}},M=function(e){return{type:"APP/SET-ERROR",error:e}};function V(e){return r.a.createElement(h.a,Object.assign({elevation:6,variant:"filled"},e))}function Y(){var e=Object(j.c)((function(e){return e.app.error})),t=Object(j.b)(),a=function(e,a){"clickaway"!==a&&t(M(null))};return r.a.createElement(T.a,{open:null!==e,autoHideDuration:6e3,onClose:a},r.a.createElement(V,{onClose:a,severity:"error"},e))}var q=a(60),z=[],B=function(e,t){return{type:"CHANGE-TODOLIST-FILTER",id:e,filter:t}},J=function(e,t){return{type:"CHANGE-TODOLIST-ENTITY-STATUS",id:e,entityStatus:t}},Z=a(170),W=a(131),$=a(44),Q=a(178),X=a(167),ee=r.a.memo((function(e){console.log("AddItemForm is called");var t=Object(j.c)((function(e){return e.app.status})),a=Object(n.useState)(""),c=Object($.a)(a,2),i=c[0],o=c[1],l=Object(n.useState)(null),s=Object($.a)(l,2),u=s[0],d=s[1],m=function(){i.trim()?(e.addItem(i.trim()),"succeeded"===t&&o("")):d("Title is required")};return r.a.createElement("div",null,r.a.createElement(Q.a,{variant:"outlined",value:i,onChange:function(e){o(e.currentTarget.value)},onKeyPress:function(e){null!==u&&d(null),"Enter"===e.key&&m()},error:!!u,label:"Title",helperText:u,disabled:e.disabled}),r.a.createElement(f.a,{color:"primary",onClick:m,disabled:e.disabled},r.a.createElement(X.a,null)))})),te=r.a.memo((function(e){console.log("EditableSpan is called");var t=Object(j.c)((function(e){return e.app.status})),a=Object(n.useState)(!1),c=Object($.a)(a,2),i=c[0],o=c[1],l=Object(n.useState)(e.title),s=Object($.a)(l,2),u=s[0],d=s[1];return i?r.a.createElement(Q.a,{value:u,autoFocus:!0,onBlur:function(){u.trim()&&e.changeTitle(u.trim()),"succeeded"===t&&o(!1)},onChange:function(e){d(e.currentTarget.value)},onKeyPress:function(a){"Enter"===a.key&&(u.trim()&&e.changeTitle(u.trim()),"succeeded"===t&&o(!1))}}):r.a.createElement("span",{onDoubleClick:function(){!e.disabled&&o(!0)}},e.title)})),ae=a(168),ne=a(47),re={},ce=function(e,t,a){return{type:"CHANGE-TASK-ENTITY-STATUS",taskId:e,todolistId:t,entityStatus:a}},ie=function(e,t,a){return function(n,r){var c=r().tasks[a].find((function(t){return t.id===e}));if(c){var i=Object(v.a)({deadline:c.deadline,description:c.description,priority:c.priority,startDate:c.startDate,status:c.status,title:c.title},t);n(F("loading")),n(ce(e,a,"loading")),N(a,e,i).then((function(r){0===r.data.resultCode?(n(function(e,t,a){return{type:"UPDATE_TASK",taskId:e,model:t,todoListId:a}}(e,t,a)),n(F("succeeded")),n(ce(e,a,"succeeded"))):(K(r.data,n),n(ce(e,a,"failed")))})).catch((function(t){_(t,n),n(ce(e,a,"failed"))}))}}},oe=a(180),le=r.a.memo((function(e){var t=Object(n.useCallback)((function(){e.removeTask(e.task.id)}),[e.removeTask,e.task.id]),a=Object(n.useCallback)((function(t){e.changeTaskStatus(e.task.id,t.currentTarget.checked?o.Completed:o.New)}),[e.changeTaskStatus,e.task.id]),c=Object(n.useCallback)((function(t){e.changeTaskTitle(e.task.id,t)}),[e.changeTaskTitle,e.task.id]);return r.a.createElement("li",{key:e.task.id,className:e.task.status===o.Completed?"is-done":""},r.a.createElement(oe.a,{onChange:a,checked:e.task.status===o.Completed,color:"primary",disabled:"loading"===e.task.entityStatus}),r.a.createElement(te,{title:e.task.title,changeTitle:c,disabled:"loading"===e.task.entityStatus}),r.a.createElement(f.a,{onClick:t,disabled:"loading"===e.task.entityStatus},r.a.createElement(ae.a,null)))})),se=r.a.memo((function(e){var t=e.todolist,a=e.demo,c=void 0!==a&&a;console.log("TodoList is called");var i=Object(j.c)((function(e){return e.auth.isLoggedIn})),l=Object(j.b)();Object(n.useEffect)((function(){var e;!c&&i&&l((e=t.id,function(t){t(F("loading")),w(e).then((function(a){var n=a.data.items;t(function(e,t){return{type:"SET_TASKS",tasks:e,todolistId:t}}(n,e)),t(F("succeeded"))})).catch((function(e){_(e,t)}))}))}),[]);var s=Object(j.c)((function(e){return e.tasks[t.id]})),u=s;"completed"===t.filter&&(u=s.filter((function(e){return e.status===o.Completed}))),"active"===t.filter&&(u=s.filter((function(e){return e.status===o.New})));var d=Object(n.useCallback)((function(e){l(function(e,t){return function(a){a(F("loading")),D(t,e).then((function(e){if(0===e.data.resultCode){var t=e.data.data.item;a(function(e){return{type:"ADD_TASK",task:e}}(t)),a(F("succeeded"))}else K(e.data,a)})).catch((function(e){_(e,a)}))}}(e,t.id))}),[l,t.id]),m=Object(n.useCallback)((function(e){l(function(e,t){return function(a){a(F("loading")),a(J(e,"loading")),L(e,t).then((function(n){0===n.data.resultCode?(a(function(e,t){return{type:"CHANGE-TODOLIST-TITLE",id:e,title:t}}(e,t)),a(F("succeeded")),a(J(e,"succeeded"))):(K(n.data,a),a(J(e,"failed")))})).catch((function(t){_(t,a),a(J(e,"failed"))}))}}(t.id,e))}),[l,t.id]),b=Object(n.useCallback)((function(){var e;l((e=t.id,function(t){t(F("loading")),t(J(e,"loading")),A(e).then((function(a){0===a.data.resultCode?(t(function(e){return{type:"REMOVE-TODOLIST",id:e}}(e)),t(F("succeeded"))):K(a.data,t)})).catch((function(e){_(e,t)}))}))}),[l,t.id]),O=Object(n.useCallback)((function(){l(B(t.id,"all"))}),[l,t.id]),p=Object(n.useCallback)((function(){l(B(t.id,"active"))}),[l,t.id]),g=Object(n.useCallback)((function(){l(B(t.id,"completed"))}),[l,t.id]),T=Object(n.useCallback)((function(e){l(function(e,t){return function(a){a(F("loading")),a(ce(e,t,"loading")),P(t,e).then((function(n){0===n.data.resultCode?(a(function(e,t){return{type:"REMOVE_TASK",taskId:e,todoListId:t}}(e,t)),a(F("succeeded"))):K(n.data,a)})).catch((function(e){_(e,a)}))}}(e,t.id))}),[l,t.id]),h=Object(n.useCallback)((function(e,a){l(ie(e,{status:a},t.id))}),[l,t.id]),v=Object(n.useCallback)((function(e,a){l(ie(e,{title:a},t.id))}),[l,t.id]);return r.a.createElement("div",null,r.a.createElement("h3",null,r.a.createElement(te,{title:t.title,changeTitle:m,disabled:"loading"===t.entityStatus}),r.a.createElement(f.a,{onClick:b,disabled:"loading"===t.entityStatus},r.a.createElement(ae.a,null))),r.a.createElement(ee,{addItem:d,disabled:"loading"===t.entityStatus}),r.a.createElement("ul",{style:{listStyle:"none",padding:"0"}},u.map((function(e){return r.a.createElement(le,{key:e.id,removeTask:T,changeTaskStatus:h,changeTaskTitle:v,task:e})}))),r.a.createElement("div",null,r.a.createElement(E.a,{style:{margin:"3px"},size:"small",variant:"all"===t.filter?"contained":"outlined",color:"primary",onClick:O},"All"),r.a.createElement(E.a,{style:{margin:"3px"},size:"small",variant:"active"===t.filter?"contained":"outlined",color:"primary",onClick:p},"Active"),r.a.createElement(E.a,{style:{margin:"3px"},size:"small",variant:"completed"===t.filter?"contained":"outlined",color:"primary",onClick:g},"Completed")))})),ue=a(14),de=r.a.memo((function(e){var t=e.demo,a=void 0!==t&&t,c=Object(j.c)((function(e){return e.auth.isLoggedIn}));Object(n.useEffect)((function(){!a&&c&&o((function(e){e(F("loading")),I().then((function(t){e({type:"SET-TODOLISTS",todolists:t.data}),e(F("succeeded"))})).catch((function(t){_(t,e)}))}))}),[]);var i=Object(j.c)((function(e){return e.todoLists})),o=Object(j.b)(),l=Object(n.useCallback)((function(e){o(function(e){return function(t){t(F("loading")),C(e).then((function(e){if(0===e.data.resultCode){var a=e.data.data.item;t(function(e){return{type:"ADD-TODOLIST",todoList:e}}(a)),t(F("succeeded"))}else K(e.data,t)})).catch((function(e){_(e,t)}))}}(e))}),[o]);return c?r.a.createElement(r.a.Fragment,null,r.a.createElement(Z.a,{container:!0,style:{padding:"15px"}},r.a.createElement(ee,{addItem:l})),r.a.createElement(Z.a,{container:!0,spacing:4},i.map((function(e){return r.a.createElement(Z.a,{item:!0,key:e.id},r.a.createElement(W.a,{elevation:5,style:{padding:"15px"}},r.a.createElement(se,{key:e.id,todolist:e,demo:a})))})))):r.a.createElement(ue.a,{to:"/login"})})),me=a(183),fe=a(166),be=a(171),Ee=a(172),Oe=a(90),pe=function(){var e=Object(j.b)(),t=Object(Oe.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",e.password?e.password.length<3&&(t.password="Password should contain more than 2 characters"):t.password="Required",t},onSubmit:function(a){var n;e((n=a,function(e){e(F("loading")),G(n).then((function(t){0===t.data.resultCode?(e(x(!0)),e(F("succeeded"))):K(t.data,e)})).catch((function(t){_(t,e)}))})),t.resetForm()}});return Object(j.c)((function(e){return e.auth.isLoggedIn}))?r.a.createElement(ue.a,{to:"/"}):r.a.createElement(Z.a,{container:!0,justify:"center"},r.a.createElement(Z.a,{item:!0,xs:4},r.a.createElement("form",{onSubmit:t.handleSubmit},r.a.createElement(me.a,null,r.a.createElement(fe.a,null,r.a.createElement("p",null,"To log in get registered",r.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"},"here")),r.a.createElement("p",null,"or use common test account credentials:"),r.a.createElement("p",null,"Email: free@samuraijs.com"),r.a.createElement("p",null,"Password: free")),r.a.createElement(be.a,null,r.a.createElement(Q.a,Object.assign({label:"Email",margin:"normal",type:"email"},t.getFieldProps("email"))),t.touched.email&&t.errors.email?r.a.createElement("div",{style:{color:"red"}},t.errors.email):null,r.a.createElement(Q.a,Object.assign({type:"password",label:"Password",margin:"normal"},t.getFieldProps("password"))),t.touched.password&&t.errors.password?r.a.createElement("div",{style:{color:"red"}},t.errors.password):null,r.a.createElement(Ee.a,Object.assign({label:"Remember me",control:r.a.createElement(oe.a,null)},t.getFieldProps("rememberMe"))),r.a.createElement(E.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))};var ge=function(e){var t=e.demo,a=void 0!==t&&t;console.log("App is called");var c=Object(j.c)((function(e){return e.app.status})),i=Object(j.b)();return Object(n.useEffect)((function(){i((function(e){R().then((function(t){0===t.data.resultCode?e(x(!0)):K(t.data,e)})).catch((function(t){_(t,e)}))}))}),[]),r.a.createElement("div",null,r.a.createElement(Y,null),r.a.createElement(d.a,{position:"static"},r.a.createElement(m.a,null,r.a.createElement(f.a,{edge:"start",color:"inherit","aria-label":"menu"},r.a.createElement(g.a,null)),r.a.createElement(b.a,{variant:"h6"},"Notes"),r.a.createElement(E.a,{color:"inherit"},"Login")),"loading"===c&&r.a.createElement("div",{className:u.a.progress},r.a.createElement(O.a,{color:"secondary"}))),r.a.createElement(p.a,{fixed:!0},r.a.createElement(ue.d,null,r.a.createElement(ue.b,{exact:!0,path:"/",render:function(){return r.a.createElement(de,{demo:a})}}),r.a.createElement(ue.b,{path:"/login",render:function(){return r.a.createElement(pe,null)}}),r.a.createElement(ue.b,{path:"/404",render:function(){return r.a.createElement("h1",null,"404: PAGE NOT FOUND")}}),r.a.createElement(ue.a,{from:"*",to:"/404"}))))},Te=a(41),he=a(89),je=Object(Te.c)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET-TODOLISTS":var a=Object(v.a)({},e);return t.todolists.forEach((function(e){a[e.id]=[]})),a;case"SET_TASKS":var n=Object(v.a)({},e);return n[t.todolistId]=t.tasks.map((function(e){return Object(v.a)(Object(v.a)({},e),{},{entityStatus:"succeeded"})})),n;case"REMOVE_TASK":return Object(v.a)(Object(v.a)({},e),{},Object(ne.a)({},t.todoListId,e[t.todoListId].filter((function(e){return e.id!==t.taskId}))));case"ADD_TASK":var r=Object(v.a)({},e),c=r[t.task.todoListId];return r[t.task.todoListId]=[Object(v.a)(Object(v.a)({},t.task),{},{entityStatus:"succeeded"})].concat(Object(q.a)(c)),r;case"UPDATE_TASK":var i=Object(v.a)({},e),o=i[t.todoListId];return i[t.todoListId]=o.map((function(e){return e.id===t.taskId?Object(v.a)(Object(v.a)({},e),t.model):e})),i;case"ADD-TODOLIST":return Object(v.a)(Object(v.a)({},e),{},Object(ne.a)({},t.todoList.id,[]));case"REMOVE-TODOLIST":var l=Object(v.a)({},e);return delete l[t.id],l;case"CHANGE-TASK-ENTITY-STATUS":var s=Object(v.a)({},e),u=s[t.todolistId];return s[t.todolistId]=u.map((function(e){return e.id===t.taskId?Object(v.a)(Object(v.a)({},e),{},{entityStatus:t.entityStatus}):e})),s;default:return e}},todoLists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.id}));case"SET-TODOLISTS":return t.todolists.map((function(e){return Object(v.a)(Object(v.a)({},e),{},{filter:"all",entityStatus:"succeeded"})}));case"ADD-TODOLIST":var a=Object(v.a)(Object(v.a)({},t.todoList),{},{filter:"all",entityStatus:"succeeded"});return[a].concat(Object(q.a)(e));case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.id?Object(v.a)(Object(v.a)({},e),{},{title:t.title}):e}));case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.id?Object(v.a)(Object(v.a)({},e),{},{filter:t.filter}):e}));case"CHANGE-TODOLIST-ENTITY-STATUS":return e.map((function(e){return e.id===t.id?Object(v.a)(Object(v.a)({},e),{},{entityStatus:t.entityStatus}):e}));default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(v.a)(Object(v.a)({},e),{},{status:t.status});case"APP/SET-ERROR":return Object(v.a)(Object(v.a)({},e),{},{error:t.error});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGGED-IN":return Object(v.a)(Object(v.a)({},e),{},{isLoggedIn:t.value});default:return e}}}),ve=Object(Te.d)(je,Object(Te.a)(he.a));window.store=ve;var Se=a(46);i.a.render(r.a.createElement(j.a,{store:ve},r.a.createElement(Se.a,null,r.a.createElement(ge,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},81:function(e,t,a){e.exports={progress:"App_progress__3J7Qh"}}},[[102,1,2]]]);
//# sourceMappingURL=main.ae83bb3b.chunk.js.map