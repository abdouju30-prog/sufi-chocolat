import type { Metadata } from 'next'
import LegalShell from '@/components/legal/LegalShell'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — Sufi Chocolat',
  description: 'CGV applicables aux achats effectués sur sufichocolat.ma — Casablanca, Maroc.',
}

export default function CGVPage() {
  return (
    <LegalShell
      title="Conditions Générales de Vente"
      subtitle="Applicables à toute commande passée sur sufichocolat.ma — Casablanca, Maroc"
      lastUpdated="25 mai 2026"
      sections={[
        {
          title: '1. Objet et champ d\'application',
          content: (
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles
              entre <strong>Sufi Chocolat SARL</strong>, société de droit marocain immatriculée au
              Registre de Commerce de Casablanca, et tout client passant commande sur le site
              sufichocolat.ma. Toute commande implique l&apos;acceptation pleine et entière des présentes CGV,
              conformément au <strong>Code de commerce marocain</strong> et à la <strong>Loi n° 31-08
              édictant des mesures de protection du consommateur</strong>.
            </p>
          ),
        },
        {
          title: '2. Produits',
          content: (
            <>
              <p>
                Sufi Chocolat propose à la vente des bouquets de fleurs fraîches, des peluches et
                des chocolats artisanaux fabriqués artisanalement à Casablanca.
              </p>
              <p className="mt-2">
                <strong>Chocolats artisanaux :</strong> Nos chocolats sont fabriqués chaque jour dans
                notre atelier de Casablanca. La liste complète des ingrédients et des allergènes est
                disponible sur chaque fiche produit.
              </p>
              <p className="mt-2">
                <strong>Allergènes présents dans notre atelier :</strong> lait, gluten, œufs,
                fruits à coque (amandes, noisettes, pistaches, noix de cajou), soja, arachides.
                Nos produits sont fabriqués dans un atelier utilisant ces ingrédients — risque de
                traces pour les personnes allergiques. Contactez-nous avant commande.
              </p>
              <p className="mt-2">
                <strong>Fleurs fraîches :</strong> Les compositions sont réalisées le matin même
                de la livraison. En raison de la disponibilité saisonnière, les variétés peuvent
                être substituées par des fleurs de qualité équivalente.
              </p>
            </>
          ),
        },
        {
          title: '3. Prix',
          content: (
            <>
              <p>
                Les prix sont exprimés en <strong>dirhams marocains (MAD) TTC</strong>, TVA marocaine
                applicable incluse (20 % sur les produits non alimentaires ; 10 % sur les produits
                alimentaires chocolatés).
              </p>
              <p className="mt-2">
                <strong>Frais de livraison :</strong> offerts dès 650 MAD d&apos;achat.
                En dessous : 49 MAD. Option express (livraison en 2h sur Casablanca) : +40 MAD.
              </p>
              <p className="mt-2">
                Sufi Chocolat se réserve le droit de modifier ses tarifs à tout moment.
                Les commandes sont facturées au prix en vigueur au moment de leur validation.
              </p>
            </>
          ),
        },
        {
          title: '4. Commande',
          content: (
            <>
              <p>La commande se déroule en 4 étapes :</p>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>Sélection des produits et ajout au panier</li>
                <li>Choix de la date, du créneau et de l&apos;adresse de livraison sur Casablanca</li>
                <li>Validation du paiement</li>
                <li>Confirmation par email ou SMS</li>
              </ol>
              <p className="mt-3">
                La commande est ferme à compter de la confirmation du paiement. Un récapitulatif
                est envoyé par email dans les minutes suivant la validation.
              </p>
            </>
          ),
        },
        {
          title: '5. Paiement',
          content: (
            <>
              <p>Les modes de paiement acceptés :</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Carte bancaire marocaine (CMI) et internationale (Visa, Mastercard)</li>
                <li>Virement bancaire (confirmation avant préparation)</li>
                <li>Paiement à la livraison (cash — sur Casablanca uniquement)</li>
                <li>Apple Pay / Google Pay (selon disponibilité)</li>
              </ul>
              <p className="mt-3">
                Les paiements en ligne sont sécurisés. Aucune donnée bancaire n&apos;est stockée
                sur nos serveurs.
              </p>
            </>
          ),
        },
        {
          title: '6. Livraison — Zone Casablanca',
          content: (
            <>
              <p>
                Nous livrons actuellement dans le <strong>Grand Casablanca</strong> (Casablanca,
                Aïn Sebaâ, Ain Chock, Bernoussi, Hay Hassani, Maarif, Anfa, etc.).
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>Livraison même jour :</strong> commande avant 14h00</li>
                <li><strong>Créneaux :</strong> Matin (8h–12h) · Après-midi (12h–18h) · Express (2h, +40 MAD)</li>
                <li><strong>Livraison J+1 à J+6 :</strong> sur les 7 prochains jours</li>
              </ul>
              <p className="mt-3">
                <strong>Conservation des chocolats :</strong> À conserver entre 12 °C et 18 °C,
                à l&apos;abri de la chaleur et de l&apos;humidité. En été (juin–septembre), nous
                recommandons le créneau du matin pour préserver la qualité des chocolats.
              </p>
              <p className="mt-2">
                En cas d&apos;absence à la livraison, notre livreur vous contacte par téléphone.
                Après deux tentatives infructueuses, la commande est annulée et remboursée
                (hors frais de livraison).
              </p>
            </>
          ),
        },
        {
          title: '7. Rétractation et retours',
          content: (
            <>
              <p>
                Conformément à la <strong>Loi n° 31-08 (art. 37)</strong>, le droit de rétractation
                <strong> ne s&apos;applique pas</strong> aux :
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>
                  <strong>Chocolats artisanaux et fleurs fraîches</strong> : denrées périssables
                  susceptibles de se détériorer rapidement
                </li>
                <li>
                  <strong>Coffrets personnalisés</strong> : produits confectionnés selon les
                  spécifications du client (message, ruban, wrapping)
                </li>
              </ul>
              <p className="mt-3">
                <strong>Peluches non personnalisées :</strong> Retour accepté dans les 7 jours
                suivant la réception, produit intact dans son emballage d&apos;origine.
              </p>
              <p className="mt-2">
                <strong>Produit endommagé / erreur de commande :</strong> Photographiez le produit
                dans les 24h et contactez-nous à bonjour@sufichocolat.ma ou au +212 6XX XX XX XX.
                Nous procédons au remplacement ou au remboursement intégral sans frais.
              </p>
            </>
          ),
        },
        {
          title: '8. Garanties',
          content: (
            <p>
              Nos produits bénéficient des garanties légales prévues par la <strong>Loi n° 31-08
              sur la protection du consommateur</strong>. En cas de défaut de conformité constaté
              à la livraison, le client dispose de 24 heures pour nous en informer avec preuve
              photographique. Nous nous engageons à remplacer ou rembourser tout produit
              non conforme.
            </p>
          ),
        },
        {
          title: '9. Service client',
          content: (
            <>
              <p>Notre service client est disponible du lundi au samedi, 9h–20h :</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>Email :</strong> bonjour@sufichocolat.ma</li>
                <li><strong>WhatsApp / Téléphone :</strong> +212 6XX XX XX XX</li>
                <li><strong>Instagram :</strong> @sufichocolat</li>
              </ul>
              <p className="mt-3">
                En cas de litige non résolu à l&apos;amiable, vous pouvez saisir le
                <strong> Service de Protection du Consommateur</strong> auprès du Ministère
                du Commerce et de l&apos;Industrie du Maroc.
              </p>
            </>
          ),
        },
        {
          title: '10. Droit applicable',
          content: (
            <p>
              Les présentes CGV sont soumises au <strong>droit marocain</strong>, notamment au
              Code de commerce, à la Loi n° 31-08 sur la protection du consommateur et à la
              Loi n° 53-05 relative à l&apos;échange électronique de données juridiques.
              Tout litige sera porté devant les <strong>tribunaux compétents de Casablanca</strong>.
            </p>
          ),
        },
      ]}
    />
  )
}
