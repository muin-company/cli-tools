# npm 배포 체크리스트 - @muin/curl-to-code

## 배포 전 필수 점검 ✅

### 1. package.json 검증
- [x] **name**: `@muin/curl-to-code` - 스코프 패키지명 확인
- [x] **version**: `1.0.0` - 시맨틱 버저닝 확인
- [x] **description**: 명확한 설명 작성
- [x] **main**: `dist/index.js` - 진입점 확인
- [x] **bin**: `curl-to-code` CLI 명령어 설정
- [x] **files**: `dist/`, `README.md` 포함 확인
- [x] **keywords**: 검색 최적화용 키워드 8개
- [x] **author**: MUIN
- [x] **license**: MIT
- [x] **repository**: GitHub monorepo 경로 설정
- [x] **bugs**: 이슈 트래커 URL
- [x] **homepage**: README 링크
- [x] **scripts.prepublishOnly**: 자동 빌드 설정

### 2. 빌드 및 테스트
- [x] **의존성 설치**: `npm install` 성공 (303 packages)
- [x] **TypeScript 빌드**: `npm run build` 에러 없음
- [x] **dist/ 생성 확인**: cli.js, converter.js, index.js 및 .d.ts 파일들
- [x] **CLI 실행 테스트**: `node dist/cli.js --help` 정상 작동
- [x] **기능 테스트 - fetch**: POST 요청 변환 성공
- [x] **기능 테스트 - python**: GET 요청 변환 성공
- [x] **패키징 테스트**: `npm pack --dry-run` - 61.7 kB, 8개 파일

### 3. 문서화
- [x] **README.md**: 설치, 사용법, 예제 포함 (34 KB 상세 문서)
- [x] **LICENSE**: MIT License (루트 디렉토리)
- [ ] **CHANGELOG.md**: 버전별 변경 사항 (선택 사항)

### 4. npm 계정 및 권한
- [ ] **npm 로그인**: `npm login` 또는 `npm whoami` 확인
- [ ] **@muin 스코프 권한**: 스코프 패키지 배포 권한 확인
- [ ] **2FA 설정**: npm 계정 보안 권장

### 5. 배포 실행

#### 첫 배포 (1.0.0)
```bash
cd ~/cli-tools/packages/curl-to-code
npm publish --access public
```

**주의**: 스코프 패키지는 기본적으로 private이므로 `--access public` 필수!

#### 버전 업데이트 후 배포
```bash
# 패치 (1.0.0 → 1.0.1)
npm version patch
npm publish --access public

# 마이너 (1.0.0 → 1.1.0)
npm version minor
npm publish --access public

# 메이저 (1.0.0 → 2.0.0)
npm version major
npm publish --access public
```

### 6. 배포 후 검증
- [ ] **npm 페이지 확인**: https://www.npmjs.com/package/@muin/curl-to-code
- [ ] **전역 설치 테스트**: `npm install -g @muin/curl-to-code`
- [ ] **CLI 실행**: `curl-to-code --help`
- [ ] **npx 테스트**: `npx @muin/curl-to-code --version`

### 7. 마케팅 & 공유
- [ ] **GitHub Release**: 태그 및 릴리스 노트 작성
- [ ] **Twitter/X 공지**: @muin 계정으로 공지
- [ ] **블로그 포스트**: 사용 사례 및 튜토리얼

---

## 주요 기능 요약

- **Interactive Mode**: 단계별 가이드 코드 생성
- **Multi-Language**: Python, JavaScript (Fetch/Axios), Node.js, Go, PHP, Ruby
- **Production-Ready**: 에러 핸들링, 타입 어노테이션, 베스트 프랙티스
- **Live Preview**: 코드 미리보기 및 클립보드 복사
- **CLI 친화적**: stdin/stdout 파이프 지원

## 배포 명령어 Quick Reference

```bash
# 1. 빌드 테스트
npm run build

# 2. 패키징 시뮬레이션
npm pack --dry-run

# 3. 실제 배포
npm publish --access public

# 4. 설치 테스트
npm install -g @muin/curl-to-code
curl-to-code --help
```

## 트러블슈팅

### "403 Forbidden" 에러
→ `npm login` 재실행 또는 `--access public` 플래그 추가

### "You must verify your email" 에러
→ npm 계정 이메일 인증 완료 필요

### bin 스크립트 실행 안 됨
→ `#!/usr/bin/env node` shebang 확인 (dist/cli.js 첫 줄)

### 의존성 취약점 경고
→ `npm audit fix` 실행 후 재빌드

---

**작성일**: 2026-02-09  
**작성자**: MJ (COO Agent)  
**상태**: ✅ 배포 준비 완료
