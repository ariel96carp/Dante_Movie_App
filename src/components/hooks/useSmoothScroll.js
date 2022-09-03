import { useEffect } from 'react'

export default function UseSmoothScroll(deps = []) {
    useEffect(() => {
        if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'smooth' })
    }, deps)
}
