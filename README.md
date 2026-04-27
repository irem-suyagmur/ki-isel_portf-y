**İremsu Yağmur Okul No: 24080410021**

<div align="center">
  <br />
  <img src="assets/og-image.png" alt="Portfolyo Banner" width="800" style="border-radius:10px;">
  <br />
  <h1>✨ Kişisel Portföy ve DevSecOps Altyapısı ✨</h1>
  <p>Minimalist tasarım, kusursuz performans, kurumsal seviye DevOps otomasyonları. 🚀</p>

  [![Lighthouse Score](https://img.shields.io/badge/Lighthouse-98%2F100-success?style=for-the-badge&logo=google-chrome)](#)
  [![Docker Ready](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#)
  [![Deployed on Fly.io](https://img.shields.io/badge/Fly.io-Deployed-5C3EE8?style=for-the-badge&logo=fly.io&logoColor=white)](#)
  [![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge&logo=github-actions)](#)
</div>

<hr/>

## 🌟 Proje Hakkında
Bu proje, **BMU1208 Web Tabanlı Programlama** dersi Seri 4 kapsamında geliştirilmiş modern bir geliştirici portföyüdür. React veya Next.js gibi ağır framework'ler **kullanılmadan**, tamamen aslına sadık kalınarak (Vanilla HTML, CSS, JavaScript) inşa edilmiştir.

Projenin temel felsefesi: *Az kod, yüksek performans ve uçtan uca DevOps otomasyonudur.* Sayfa ağırlığı son derece düşüktür ve karanlık/aydınlık (Dark/Light) tema modları, pürüzsüz kaydırma animasyonları gibi ince detayları destekler.

### 💼 Portföyün Geliştiricisi
Merhaba, ben **İremsu Yağmur**. Bitlis Eren Üniversitesi Bilgisayar Mühendisliği 2. Sınıf öğrencisiyim. Backend geliştirme (Go, Node.js), modern mimariler ve bulut sistemleri üzerine çalışmalar yapıyorum. Bu portföy, öğrendiğim becerileri gerçek dünya (production) senaryolarıyla sergileme aracımdır.

---

## 🛠 Kullanılan Teknolojiler (Tech Stack)

### 🎨 Frontend
- **HTML5 & CSS3:** Semantik etiketler, CSS Grid & Flexbox tabanlı, Responsive (Mobil uyumlu) tasarım.
- **Vanilla JavaScript:** Framework kullanmadan DOM manipülasyonu, form validasyonu ve sayfa içi scroll animasyonları.
- **Tasarım Sistemi:** Özelleştirilmiş renk paletleri ve CSS değişkenleri (`:root`) ile Dark/Light tema geçişi.

### 🐳 DevOps & Altyapı
- **Konteynerleştirme (Docker):** Alpine tabanlı Nginx `Dockerfile` ile optimize edilmiş (sadece ~30MB) multi-stage build.
- **GitHub Actions (CI/CD):** 
  - *Sürekli Entegrasyon (CI):* Kod pushlandığında otomatik HTML/CSS/JS Linting.
  - *Sürekli Dağıtım (CD):* Otomatik imaj build işlemi ve GitHub Container Registry'ye (GHCR) aktarma.
- **DevSecOps (Güvenlik Tarama):** 
  - Geliştirdiğim Pipeline içerisinde `Trivy` (Konteyner ve OS açık taraması), `Semgrep` (Kod güvenliği analizi) ve `gitleaks` (Yanlışlıkla şifre vb. secret eklenmesini engelleme) adımları çalışır.
- **Deployment:** Fly.io cloud altyapısında canlı olarak koşturulur. Cloudflare üzerinden ise Edge Caching ve özel alan adı yönlendirmesi yapılır.
- **İzleme (Observability):** Better Stack ile Nginx arkasındaki özel `/health` kontrol noktam düzenli pinglenerek uygulamanın Up (ayakta) durumu denetlenir.

---

## 🚀 Projeyi Bilgisayarınızda Çalıştırma

Platformda Node.js vs. kurmanıza gerek yoktur, proje en başından itibaren izole bir yapıya (Docker) sahip olacak şekilde tasarlandı.

1. **Repoyu Bilgisayarınıza Klonlayın:**
   ```bash
   git clone https://github.com/irem-suyagmur/portfolyo.git
   cd portfolyo
   ```

2. **Docker Compose ile Başlatın:**
   ```bash
   docker compose up --build -d
   ```
   *(Arkaplanda Nginx içeren imaj inşa edilecek ve web sunucusu başlayacaktır.)*

3. **Tarayıcınızda Görüntüleyin:**
   - Web Arayüzü: [http://localhost:8080](http://localhost:8080)
   - Uygulama Sağlık Durumu API'sı: [http://localhost:8080/health](http://localhost:8080/health)

4. **Sistemi Kapatmak İçin:**
   ```bash
   docker compose down
   ```

---

## 🏗 Mimari Şeması

Projenin yaşam döngüsünü (kod yazımından canlı yayına kadarki süreç) aşağıdaki yapı üzerinden detaylıca inceleyebilirsiniz:

```mermaid
flowchart TD
    %% Bileşenler
    Developer([İremsu Yağmur / Geliştirici])
    
    subgraph GitHub Actions [Güvenli CI/CD Boru Hattı]
        Direction TB
        Linter[HTML/CSS Linter]
        Trivy[Trivy Vulnerability Scan]
        Semgrep[Semgrep Kod Analizi]
        Gitleaks[GitLeaks Sensetive Data Scan]
        Build[Docker Image Build]
        GHCR[(GitHub Container Registry)]
    end
    
    subgraph Canlı Sunucu [Fly.io Cloud]
        Nginx[Nginx Alpine Web Server]
        StaticFiles[Static Assests & HTML]
        HealthCheck((/health Endpoint))
    end
    
    subgraph İzleme & Edge [Cloudflare & BetterStack]
        CDN[Cloudflare CDN & SSL]
        Uptime[Better Stack Uptime]
    end
    
    %% Flow
    Developer ==>|git push| Linter
    Linter --> Semgrep
    Linter --> Gitleaks
    Semgrep --> Build
    Gitleaks --> Build
    
    Build --> Trivy
    Trivy -->|CRITICAL block mekanizması| GHCR
    GHCR ==>|Fly.io Deploy YAML| Nginx
    
    Nginx --> StaticFiles
    Nginx --> HealthCheck
    
    Nginx <==> CDN
    HealthCheck -.->|Saniyede 1 Ping| Uptime
```

---

## 🤝 İletişim

Eğer bu altyapıyı veya kod bloklarını beğendiyseniz ya da proje hakkında değerlendirme/geribildirim yapmak isterseniz dildiğiniz zaman benimle iletişime geçebilirsiniz.

- **Email:** iremyagm@gmail.com
- **LinkedIn:** [linkedin.com/in/iremsu-yağmur-3b16063a8](https://www.linkedin.com/in/iremsu-ya%C4%9Fmur-3b16063a8/)

*Projeyi okuduğunuz için teşekkürler!* ✨
