import styled, { css } from 'styled-components'

import Box from '@/components/Box'


function PageMain({ data }) {
  return <>
    <main>
      <div className="container">
        <StBlog>
            <div className="px-3 prologue">
              <h2>楽しいこと。コードを書くこと</h2>
              <p>プログラミングも必修になっていくこの現代。</p>
              <p className="mb-3">自分は手に職をつけようと思って始めたプログラミングですがお仕事をいただけるくらいまでなれたことは本当に嬉しいです。</p>
              <p className="mb-4">新しいことが大好きで常に新しい技術を追い求めたり、面白いサイトを考えたりする毎日です。</p>
            </div>
          <Box
            header="このサイトについて"
          >
            <div className="px-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: data.about
                }}
              />
            </div>
          </Box>
        </StBlog>
      </div>
    </main>
  </>
}

export default PageMain

const StBlog = styled.section`
${({theme}) => css`
  .prologue {
    text-align: center;
    margin-bottom: 88px;
    p {
      margin-bottom: 0;
    }
    p.font-weight-bold {
      font-weight: bold;
    }
    p.sup {
      font-size: .8rem;
      color: ${theme.colors.gray};
    }
  }
`}`