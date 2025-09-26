'use client'
import { useRouter } from 'next/navigation'
import { Button } from 'react-bootstrap';
function FacebookPage() {
    const router = useRouter()
    const HandleClick = () => {
        router.push('/')
    }
    return (
        <>
            <h1>Facebook Page</h1>

            <Button variant="primary"  >Go back by bootstrap</Button>{' '}

            <button onClick={HandleClick} >Go back home</button>
        </>
    )
}

export default FacebookPage;