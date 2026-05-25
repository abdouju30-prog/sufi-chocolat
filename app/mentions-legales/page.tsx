import type { Metadata } from 'next'
import LegalShell from '@/components/legal/LegalShell'

export const metadata: Metadata = {
  title: 'Mentions légales — Sufi Chocolat',
  description: 'Mentions légales du site Sufi Chocolat, Casablanca, Maroc.',
}

export default function MentionsLegalesPage() {
  return (
    <LegalShell
      title="Mentions légales"
      subtitle="Informations légales relatives au site sufichocolat.ma — Casablanca, Maroc"
      lastUpdated="25 mai 2026"
      sections={[
        {
          title: '1. Éditeur du site',
          content: (
            <>
              <p>Le site <strong>sufichocolat.ma</strong> est édité par :</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>Raison sociale :</strong> Sufi Chocolat SARL</li>
                <li><strong>Siège social :</strong> [Adresse complète], Casablanca, Maroc</li>
                <li><strong>RC :</strong> [Numéro Registre de Commerce]</li>
                <li><strong>ICE :</strong> [Identifiant Commun de l'Entreprise]</li>
                <li><strong>IF :</strong> [Identifiant Fiscal]</li>
                <li><strong>Capital social :</strong> [Montant] MAD</li>
                <li><strong>Email :</strong> bonjour@sufichocolat.ma</li>
                <li><strong>Téléphone :</strong> +212 6XX XX XX XX</li>
              </ul>
              <p className="mt-3">
                <strong>Directeur de la publication :</strong> [Nom du gérant]
              </p>
            </>
          ),
        },
        {
          title: '2. Hébergement',
          content: (
            <>
              <p>Le site est hébergé par :</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>Société :</strong> Vercel Inc.</li>
                <li><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
                <li><strong>Site :</strong> vercel.com</li>
              </ul>
            </>
          ),
        },
        {
          title: '3. Propriété intellectuelle',
          content: (
            <p>
              L&apos;ensemble du contenu de ce site — textes, images, photographies, logos, illustrations,
              vidéos et éléments graphiques — est la propriété exclusive de Sufi Chocolat SARL et est
              protégé par la législation marocaine relative à la propriété intellectuelle (Loi n° 2-00
              relative aux droits d&apos;auteur et droits voisins). Toute reproduction ou représentation,
              totale ou partielle, sans accord préalable écrit est interdite.
            </p>
          ),
        },
        {
          title: '4. Protection des données personnelles',
          content: (
            <>
              <p>
                Conformément à la <strong>Loi n° 09-08</strong> relative à la protection des personnes
                physiques à l&apos;égard du traitement des données à caractère personnel (Maroc) et sous
                le contrôle de la <strong>CNDP</strong> (Commission Nationale de contrôle de la
                Protection des Données à caractère Personnel), vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Droit d&apos;accès à vos données personnelles</li>
                <li>Droit de rectification des informations inexactes</li>
                <li>Droit d&apos;opposition au traitement</li>
                <li>Droit d&apos;effacement dans les conditions légales</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits : <strong>privacy@sufichocolat.ma</strong>
              </p>
              <p className="mt-2">
                Les données collectées (nom, email, adresse de livraison, téléphone) sont utilisées
                exclusivement pour le traitement de vos commandes. Durée de conservation : 5 ans
                conformément à la loi marocaine.
              </p>
              <p className="mt-2">
                Vous pouvez introduire une réclamation auprès de la CNDP : <strong>cndp.ma</strong>
              </p>
            </>
          ),
        },
        {
          title: '5. Cookies',
          content: (
            <p>
              Ce site utilise des cookies techniques nécessaires à son fonctionnement (session, panier,
              préférences de navigation) et des cookies analytiques anonymisés pour améliorer
              l&apos;expérience utilisateur. Vous pouvez désactiver les cookies dans les paramètres de
              votre navigateur.
            </p>
          ),
        },
        {
          title: '6. Responsabilité',
          content: (
            <p>
              Sufi Chocolat SARL s&apos;efforce d&apos;assurer l&apos;exactitude des informations
              diffusées sur ce site. Nous ne pouvons cependant garantir l&apos;exhaustivité de ces
              informations. La responsabilité de Sufi Chocolat ne saurait être engagée pour tout
              dommage résultant de l&apos;utilisation du site ou de l&apos;impossibilité d&apos;y
              accéder.
            </p>
          ),
        },
        {
          title: '7. Droit applicable — Tribunal compétent',
          content: (
            <p>
              Les présentes mentions légales sont régies par le <strong>droit marocain</strong>.
              Tout litige relatif à l&apos;interprétation ou à l&apos;exécution des présentes sera
              soumis aux <strong>tribunaux compétents de Casablanca</strong>, sauf disposition
              légale contraire.
            </p>
          ),
        },
      ]}
    />
  )
}
