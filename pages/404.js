
import BaseLayout from '@/components/BaseLayout'

function PageMain() {
  return (
    <main className="main">
      <p>ページがありません。</p>
    </main>
  );
}

function Custom404() {
  return <>
    <BaseLayout>
      <PageMain />
    </BaseLayout>
  </>
}

export default Custom404
