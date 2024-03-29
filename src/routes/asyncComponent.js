import React, {Suspense} from "react";
export const asyncComponent = loadComponent => (
   class AsyncComponent extends React.Component {
      state = {
         Component: null
      }
      componentWillMount(){
         if(this.hasLoadedComponent()){
            return
         }
         loadComponent()
            .then(module => module.default)
            .then((Component) => {
               this.setState({Component})
            })
            .catch((err) => {
               console.error(`Cannot load component in <AsyncComponent />`)
               throw err
            })
      }
      hasLoadedComponent(){
         return this.state.Component !== null
      }
      render(){
         const Component = this.state.Component
         return Component? <Component {...this.props} /> : null
      }
   }
)

export function WaitingComponent(Component) {
   return props => (
     <Suspense fallback={<div>Loading...</div>}>
       <Component {...props} />
     </Suspense>
   );
 }