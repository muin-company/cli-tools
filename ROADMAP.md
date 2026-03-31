# 🗺️ MUIN CLI Tools — Roadmap

> Last updated: 2026-03-27

---

## 📸 Phase 1: Current State (완료)

### 배포된 npm 패키지 (3개)

| Package | npm Name | Version | Weekly Downloads |
|---------|----------|---------|-----------------|
| 🔥 roast | `roast-cli` | 1.0.2 | ~310 |
| 🛡️ portguard | `portguard` | 0.1.3 | ~313 |
| 🔍 git-why | `git-why` | 0.1.3 | ~301 |

**합계: ~924 weekly downloads** (2026-03-25 기준)

### 미배포 도구 (10개)

| Package | npm Name (planned) | Status | Notes |
|---------|--------------------|--------|-------|
| 💥 oops | `oops-cli` ❌ | Name conflict | `oops-cli`는 다른 저자가 선점. 이름 변경 필요 |
| 📐 json-to-types | `@muin/json-to-types` | Ready | v1.0.0, 배포 준비 완료 |
| 🔄 curl-to-code | `@muin/curl-to-code` | Ready | v1.0.0, 배포 준비 완료 |
| 📦 bundlesize | `@muin/bundlesize` | Ready | v1.0.0 |
| 🔑 envdiff | `@muin/envdiff` | Ready | v1.0.0 |
| ⚙️ tsconfig-helper | `@muin/tsconfig-helper` | Ready | v1.0.0 |
| 📝 readme-gen | `@muin/readme-gen` | Ready | v1.0.0 |
| 🔍 depcheck-lite | `@muin/depcheck-lite` | Ready | v1.0.0 |
| 🔒 lockcheck | `@muin/lockcheck` | Ready | v1.0.0 |
| ⏰ cron-explain | `@mj-muin/cronex` | Ready | v0.1.0 |

### 인프라 현황
- **Monorepo:** `packages/` 기반, 13개 패키지
- **GitHub:** [muin-company/cli-tools](https://github.com/muin-company/cli-tools) — ⭐ 0 stars
- **CI/CD:** 없음 (수동 배포)
- **테스트:** 패키지별 개별 테스트 존재, 통합 테스트 없음

---

## 🚀 Phase 2: Expand & Publish (2026 Q2 — Apr~Jun)

### 2.1 미배포 도구 npm 배포 (4월)

**Wave 1 (4월 1주)** — 고가치 도구 우선
- [ ] `@muin/json-to-types` 배포 — JSON → 타입 변환은 수요 높음
- [ ] `@muin/curl-to-code` 배포 — curl 관련 도구는 검색량 높음
- [ ] `@mj-muin/cronex` 배포 — 가볍고 제로 디펜던시, 바이럴 잠재력

**Wave 2 (4월 2주)** — DX 도구
- [ ] `@muin/envdiff` 배포
- [ ] `@muin/depcheck-lite` 배포
- [ ] `@muin/bundlesize` 배포

**Wave 3 (4월 3주)** — 나머지
- [ ] `@muin/lockcheck` 배포
- [ ] `@muin/readme-gen` 배포
- [ ] `@muin/tsconfig-helper` 배포

**oops 이름 문제 해결**
- [ ] npm 이름 결정: `oops-explain`, `wtf-error`, 또는 unscoped 대안 조사
- [ ] 이름 확정 후 배포 (4월 내)

### 2.2 각 도구별 개선 포인트

| Package | 개선 사항 | 우선순위 |
|---------|-----------|---------|
| roast | CI 연동 가이드 추가, `--format sarif` 지원 | 🔴 High |
| git-why | `--since` 날짜 필터, 대형 레포 성능 최적화 | 🔴 High |
| portguard | Docker 컨테이너 포트 탐지, `--watch` 모드 | 🟡 Medium |
| json-to-types | Go struct 출력 추가, JSON Schema 입력 지원 | 🟡 Medium |
| curl-to-code | Rust/Go 코드 생성, `--from-har` 지원 | 🟡 Medium |
| cron-explain | 다국어 (한/영/일), systemd timer 지원 | 🟢 Low |
| oops | Stack trace 자동 파싱, 프레임워크별 컨텍스트 | 🔴 High |

### 2.3 인프라 강화

- [ ] **GitHub Actions CI** — PR마다 전 패키지 lint + test (4월)
- [ ] **통합 테스트 스위트** — `pnpm test:all` 루트 명령 (4월)
- [ ] **Changesets 도입** — 버전 관리 자동화 (5월)
- [ ] **npm provenance** — `--provenance` 플래그로 공급망 보안 (5월)

---

## 🌍 Phase 3: Community & Ecosystem (2026 Q3 — Jul~Sep)

### 3.1 커뮤니티 컨트리뷰션

- [ ] **CONTRIBUTING.md 강화** — 기존 파일 업데이트, "good first issue" 태그 10개+
- [ ] **Issue/PR 템플릿** — bug report, feature request, new tool proposal
- [ ] **Discord 채널** — CLI tools 사용자 커뮤니티 (MUIN Discord 내)
- [ ] **Monthly contributor spotlight** — X/블로그에 기여자 소개

### 3.2 CLI Tools Marketplace 구상

- [ ] **`muin` 메타 CLI** — `muin install roast`, `muin list` 통합 설치 도구
- [ ] **Plugin 아키텍처** — 커뮤니티가 도구를 추가할 수 있는 구조
- [ ] **웹 플레이그라운드** — 브라우저에서 도구 체험 (json-to-types, cron-explain 등)

### 3.3 OSS 지속가능성

| 모델 | 설명 | 목표 시기 |
|------|------|-----------|
| GitHub Sponsors | 개인/기업 후원 | 2026 Q3 |
| Pro tier | 고급 기능 (roast Pro: 커스텀 룰셋) | 2026 Q4 |
| 기업 라이선스 | 팀/CI 통합 패키지 | 2027 Q1 |

---

## 🎯 2026 Q2 마일스톤 (April — June)

### 핵심 지표 (KPI)

| 지표 | 현재 | 4월 목표 | 5월 목표 | 6월 목표 |
|------|------|----------|----------|----------|
| npm 주간 다운로드 (합계) | ~924 | 1,500 | 2,500 | 5,000 |
| 배포된 패키지 수 | 3 | 10 | 12 | 13 |
| GitHub stars | 0 | 15 | 30 | 50 |
| Contributors | 1 | 2 | 3 | 5 |

### 월별 액션 플랜

#### 🗓️ April 2026 — "Ship Everything"

**Week 1 (Mar 30 ~ Apr 5)**
- [ ] Wave 1 배포: json-to-types, curl-to-code, cron-explain
- [ ] 각 패키지 README에 demo GIF 추가
- [ ] GitHub Actions CI 파이프라인 설정

**Week 2 (Apr 6 ~ 12)**
- [ ] Wave 2 배포: envdiff, depcheck-lite, bundlesize
- [ ] Dev.to 게시글: "13 CLI Tools We Built in One Monorepo"
- [ ] Hacker News Show HN 포스팅

**Week 3 (Apr 13 ~ 19)**
- [ ] Wave 3 배포: lockcheck, readme-gen, tsconfig-helper
- [ ] oops 이름 확정 + 배포
- [ ] X(@muincompany) 시리즈: "Tool of the Day" 13일 캠페인

**Week 4 (Apr 20 ~ 26)**
- [ ] 통합 테스트 스위트 완성
- [ ] roast v1.1: SARIF output + CI 가이드
- [ ] git-why v0.2: 날짜 필터 + 성능 개선

#### 🗓️ May 2026 — "Polish & Grow"

- [ ] Changesets 도입, 자동 릴리즈 파이프라인
- [ ] npm provenance 전 패키지 적용
- [ ] Reddit r/webdev, r/node, r/commandline 홍보
- [ ] 한국 개발자 커뮤니티 (velog, disquiet) 소개글
- [ ] 주요 도구 v1.0 릴리즈: roast, portguard, git-why

#### 🗓️ June 2026 — "v1.0 & Community"

- [ ] **메이저 릴리즈: 전 패키지 v1.0** (안정 API 확정)
- [ ] CONTRIBUTING.md v2 + good first issues
- [ ] GitHub Sponsors 프로필 활성화
- [ ] 목표 달성 리뷰 + Phase 3 상세 계획 수립
- [ ] 📊 Q2 회고 및 Q3 로드맵 작성

---

## 📈 성장 전략

### 바이럴 도구 집중
- **roast** — 유머 + 유용함 = 공유 욕구. 소셜 미디어 최적
- **cron-explain** — 제로 디펜던시, 누구나 필요, 입소문 잠재력
- **oops** — 에러 메시지 = 모든 개발자의 공통 페인포인트

### SEO & 검색 최적화
- npm 키워드 최적화 (각 패키지)
- GitHub topics 태그 추가
- 도구별 랜딩 페이지 (gumsi.kr/tools 또는 별도 도메인)

### 크로스 프로모션
- 각 도구 README에 "More tools from MUIN" 섹션
- `npx roast --help` 하단에 다른 도구 추천
- 설치 후 배너: "Like roast? Try git-why!"

---

## 🏁 장기 비전 (2027+)

```
2026 Q2: Ship all → 5K weekly downloads
2026 Q3: Community → 100 stars, first external PR
2026 Q4: Pro features → 첫 수익
2027 Q1: Enterprise → 기업 고객 1곳+
2027 H2: Ecosystem → muin CLI marketplace, 20+ tools
```

---

*이 로드맵은 살아있는 문서입니다. 매월 리뷰하고 업데이트합니다.*

*Last reviewed: 2026-03-27 by MJ*
