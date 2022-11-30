import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { verifyUser } from 'src/functions';

export default function VerifyUser() {
  const router = useRouter();

  const [statusMessage, setStatusMessage] = useState<string>(
    'Se asteapta confirmarea'
  );

  useEffect(() => {
    if (router.query.code) {
      verifyUser({ code: router.query.code })
        .then((res: any) => {
          setStatusMessage(res.message);
        })
        .catch((err) => {
          setStatusMessage(err.message);
        });
    }
  }, [router.query.code]);

  return <div>{statusMessage}</div>;
}
