import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import UnsupportedDeviceNotice from './UnsupportedDeviceNotice';

describe('UnsupportedDeviceNotice', () => {
  it('도구 이름과 지원 플랫폼을 안내한다.', () => {
    render(
      <UnsupportedDeviceNotice
        toolTitle='지도제작자들'
        supportedPlatforms={['데스크탑']}
      />,
    );
    expect(screen.getByText(/지도제작자들/)).toBeInTheDocument();
    expect(
      screen.getByText(/데스크탑에 최적화 되어 있어요/),
    ).toBeInTheDocument();
  });

  it('홈으로 돌아가는 링크를 렌더링한다.', () => {
    render(
      <UnsupportedDeviceNotice
        toolTitle='지도제작자들'
        supportedPlatforms={['데스크탑']}
      />,
    );
    expect(
      screen.getByRole('link', { name: '홈으로 돌아가기' }),
    ).toHaveAttribute('href', '/');
  });
});
