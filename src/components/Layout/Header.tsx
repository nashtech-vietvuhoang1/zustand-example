import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthStore } from '../../store'
import Navigation from './Navigation'

export const Header = () => {
  const [lang, setLang] = useState('en')
  const { user, logout } = useAuthStore()
  const { i18n } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang, i18n])

  const isActivePath = (path: string) => {
    return path === location.pathname
  }

  return (
    <Container>
      <HeaderContainer>
        <WelcomeUser>{`Welcome ${user}`}</WelcomeUser>
        <Navigation isActive={isActivePath('/')} path="/">
          Home page
        </Navigation>
        <Navigation isActive={isActivePath('/pokemons')} path="/pokemons">
          Pokemon
        </Navigation>
        <Logout onClick={logout}>Logout</Logout>
        <select
          value={lang}
          onChange={e => setLang(e.target.value)}
          className="text-blue"
        >
          <option value="en">Eng-US</option>
          <option value="vi">Tiếng việt</option>
        </select>
      </HeaderContainer>
    </Container>
  )
}

const Container = styled.div.attrs({
  className: 'max-w-[1200px] flex mx-auto w-full',
})``

const HeaderContainer = styled.div.attrs({
  className: 'h-16 w-full bg-white flex space-x-4 justify-end items-center',
})``

const WelcomeUser = styled.span.attrs({
  className: '',
})``

const Logout = styled.span.attrs({
  className: 'px-2 text-gray cursor-pointer ',
})``
