import { useAtom } from 'jotai'

import { atomGetResults } from '../../store/results'
import { atomGetAreDofDefinedByUser } from '../../store/areDofDefinedByUser'
import { atomGetAreRestrictedOnTop } from '../../store/areRestrictedsOnTop'
import TypographyH3 from '@/components/typography/typography-h3'
import Locals from './locals'

const Results = () => {
  const [response] = useAtom(atomGetResults)
  const [areDofDefinedByUser] = useAtom(atomGetAreDofDefinedByUser)
  const [areRestrictedOnTop] = useAtom(atomGetAreRestrictedOnTop)

  // response.results.locals.forEach((local, key) => {
  //   console.log(key, local)
  // })

  return (
    <div className="flex flex-col gap-2">
      {response.status !== 'prevalidationError' &&
        response.status !== 'verticesError' &&
        response.status !== 'edgesError' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <TypographyH3>
                Matrices locales de rigidez de cada elemento:
              </TypographyH3>

              <p>Selecciona las matrices que deseas visualizar:</p>

              <Locals locals={response.results.locals} />
            </div>
          </div>
        )}
    </div>
  )
}

export default Results
