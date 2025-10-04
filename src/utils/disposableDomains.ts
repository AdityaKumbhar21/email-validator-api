import disposableDomains from "disposable-email-domains";

const disposableEmailDomains: string[] = disposableDomains


export function isDomainDisposable(email: string): boolean{
        const domain = email.split('@')[1].toLowerCase()
        return disposableEmailDomains.includes(domain)
}
