import Head from "next/head";
import Link from "next/link";

const Header = () => {
    return (
        <div>
            <Head>
                <title>TwitterClone | </title>
                <meta name="description" content="TwitterClone" />
            </Head>
            <Link href="/"><h1>TwitterClone</h1></Link>
        </div>
    )
}

export default Header;