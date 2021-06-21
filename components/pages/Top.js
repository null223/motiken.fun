import { Fragment } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'

import Box from '@/components/Box'

const PageMain = ({ about, blog }) => (
  <main>
    <StSection className="pb-2">
      <h2 className="title">{about.motiken.title}</h2>
      <p className="body">{about.motiken.body}</p>
    </StSection>
    <StSection>
      <div className="title profile">
        {/*<div><img src={about.profiles.icon.url + "?w=256"} alt={about.name} /></div>*/}
        <h2>{about.profiles.name}</h2>
        <p className="profile-work">{about.profiles.work}</p>
      </div>
      <p className="body">{about.profiles.body}</p>
    </StSection>
    <StSection colored>
      <h2 className="title">Career</h2>
      <dl className="career">
        {about.careers.map((career, i) => (
          <div key={i}>
             <dt className="career-year">{career.year}</dt>
             <dd className="career-title">{career.title}</dd>
             <dd className="career-body">{career.body}</dd>
          </div>
        ))}
      </dl>
    </StSection>
    <StSection>
      <h2 className="title">Skills</h2>
      <dl className="skill">
        {about.skills.map((skill, i) => (
          <Fragment key={i}>
            <dt className="skill-title"><i className="material-icons-outlined">{skill.icon}</i>{skill.title}</dt>
            <dd className="skill-body">{skill.body}</dd>
          </Fragment>
        ))}
      </dl>
    </StSection>
    <StSection colored>
      <h2 className="title">Vision</h2>
      <p className="body">{about.vision}</p>
    </StSection>
    <StSection>
      <h2 className="title">Like</h2>
      <dl className="skill">
        {about.likes.map((like, i) => (
          <Fragment key={i}>
             <dt className="skill-title"><i className="material-icons-outlined">{like.icon}</i>{like.title}</dt>
             <dd className="skill-body">{like.body}</dd>
          </Fragment>
        ))}
      </dl>
    </StSection>
    <StSection>
      <Box
        header="Blog"
      >
        <ul>
          {blog.map(blog => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                <a>{blog.icon+" "+blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    </StSection>
  </main>
)

export default PageMain


const StSectionContainer = styled.section`
${({theme, colored}) => css`
  padding: 88px 0;
  background-color: ${colored ? theme.colors.secondary : theme.colors.white};
  .container {
    max-width: 620px;
  }
  .title {
    font-size: 2.25rem;
    margin-bottom: 1.5rem;
    color: ${theme.colors.black_light};
    text-align: center;
  }
  .body {
    white-space: pre-wrap;
    line-height: 1.75;
  }

  .profile {
    font-size: 1rem;
    &-work {
      color: ${theme.colors.gray};
      font-size: .75rem;
      margin-top: -.25rem;
    }
  }

  .career {
    & > div {
      position: relative;
      border-left: 3px solid #DEE4E6;
      margin-left: 21px;
      &:first-of-type {
        padding-top: 24px;
      }
    }
    &-year {
      position: absolute;
      left: -22px;
      font-size: .875rem;
      font-weight: normal;
      width: 42px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      border-radius: 50%;
      background-color: ${theme.colors.orange};
      color: ${theme.colors.white};
    }
    dd {
      margin-bottom: 0;
    }
    &-title {
      padding-left: 30px;
      font-weight: 900;
      line-height: 42px;
    }
    &-body {
      padding-bottom: 32px;
      padding-left: 30px;
      padding-bottom: 24px;
      line-height: 2.0;
    }
  }

  .skill {
    display: flex;
    flex-wrap: wrap;
    &-title {
      line-height: 2;
      position: relative;
      width: 30%;
      padding-left: 2rem;
      font-size: 1rem;
      & i {
        line-height: 32px;
        position: absolute;
        left: 0;
        color: ${theme.colors.orange};
      }
    }
    &-body {
      color: ${theme.colors.black_light};
      width: 70%;
      line-height: 2;
      margin-bottom: 32px;
    }
    @media screen and (max-width: 768px) {
      &-title {
        width: 100%;
      }
      &-body {
        width: 100%;
      }
    }
  }

  .box-body {
    ul {
      padding: 0;
      list-style: none;
      border-top: 1px solid ${theme.colors.border};
      margin-bottom: -16px;
    }
    li {
      list-style: none;
      border-bottom: 1px solid ${theme.colors.border};
      a {
        display: block;
        width: 100%;
        padding: 6px 18px;
        color: ${theme.colors.gray};
        &:hover {
          text-decoration: none;
          background-color: ${theme.colors.secondary};
        }
      }
    }
  }
`}`

const StSection = ({children, ...props}) => <StSectionContainer {...props} ><div className="container">{children}</div></StSectionContainer>
