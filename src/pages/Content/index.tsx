import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import logo from '../../logo.svg'
import '../../App.css'

const Content = () => {
  const { t } = useTranslation()
  return (
    <AppHeader>
      <img src={logo} className="App-logo" alt="logo" />
      <p className="bg-red-600">
        Edit <code>src/App.tsx</code> and save to reload. {t('learn xay base')}
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </AppHeader>
  )
}

export default Content

const AppHeader = styled.header.attrs({
  className:
    'flex flex-column items-center justify-center text-white min-h-[inherit]',
})`
  background-color: #282c34;
  font-size: calc(10px + 2vmin);
`
