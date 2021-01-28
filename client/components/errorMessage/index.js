import './errorMessage.css'

const ErrorMessage = () => {
  return(
    <div className='error-message'>
      <p>Согласно документации <a href='https://unsplash.com/' target='_blank'>Unsplash</a>  <br />
      Демо-приложения ограничены 50 запросами в час. <br />
      Пожалуйста, попробуйте позже.</p>
    </div>
  )
}

export default ErrorMessage