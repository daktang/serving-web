📌 사용법 요약

이미지 저장: aip-{project name}

이미지 사용: ais-{project name}

조건: ais-{project name}에서 사용하려면 반드시 aip-{project name}에 저장해야 함

👉 즉, 이미지 저장은 aip / 사용은 ais

📖 상세 가이드

[AIP Serve 프로젝트]는 AI Platform Eco System의 Image Registry에서 이미지를 저장할 수 있는 전용 공간을 제공합니다.

프로젝트별 이미지 저장 공간은 aip-{project name} 형식으로 생성됩니다.

AIP Serve에서 이미지를 불러와 사용하는 경우에는 ais-{project name} 공간을 통해 접근합니다.

따라서 ais-{project name}에서 이미지를 사용하려면, 해당 이미지는 반드시 aip-{project name} 공간에 저장되어 있어야 하며, 이 경우 Pull 권한으로 정상적으로 사용할 수 있습니다.