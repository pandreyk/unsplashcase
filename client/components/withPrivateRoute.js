import Router from 'next/router'
import { checkTokens } from '../helpers/checkTokens'

const login = '/login'

export default WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />

  hocComponent.getInitialProps = async (context) => {
    const userAuth = await checkTokens(context.req, context.res)

    if (!userAuth?.isAuth) {
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login,
        })
        context.res?.end()
      } else {
        Router.replace(login)
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: userAuth})
      return { ...wrappedProps, userAuth }
    }

    return { userAuth }
  }

  return hocComponent
}
