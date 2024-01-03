import { useEffect, useState } from 'react'

export const Header = () => {

    const [firstname, setfirstname] = useState("" as string)
    const [lastname, setlastname] = useState("" as string)

    const user: any = localStorage.getItem('userAuth')
    useEffect(() => {

        

        setfirstname(JSON.parse(user)?.firstname);
        setlastname(JSON.parse(user)?.lastname);
        return () => {
            setfirstname("");
            setlastname("")
        }
        
    }, [])

    const logout = () => {
        localStorage.removeItem("userAuth");
        window.location.pathname = ""
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 8px',
            height: '7%',
            width: '100%',
            backgroundColor: 'black',
            color: "red",
        }}>

            <div>
                <p style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    margin: '0',
                    padding: '0',
                }}>
                    {firstname} {lastname}
                </p>
            </div>

            <div className="logout" onClick={() => logout()}>
                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.5rem',
                    backgroundColor: 'white',
                    color: '#222222',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '2.5rem',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                        <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 32.610275 48 39.366605 44.294736 43.550781 38.591797 A 1.0001 1.0001 0 1 0 41.939453 37.408203 C 38.117629 42.617264 31.961725 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 C 31.961725 4 38.117629 7.3827357 41.939453 12.591797 A 1.0001 1.0001 0 1 0 43.550781 11.408203 C 39.366605 5.7052643 32.610275 2 25 2 z M 38.990234 15.990234 A 1.0001 1.0001 0 0 0 38.292969 17.707031 L 44.585938 24 L 23 24 A 1.0001 1.0001 0 1 0 23 26 L 44.585938 26 L 38.292969 32.292969 A 1.0001 1.0001 0 1 0 39.707031 33.707031 L 47.619141 25.794922 A 1.0001 1.0001 0 0 0 47.617188 24.203125 L 39.707031 16.292969 A 1.0001 1.0001 0 0 0 38.990234 15.990234 z"></path>
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    )
}
