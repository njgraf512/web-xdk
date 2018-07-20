import { register } from './index';

const svg = () => `<svg viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-192.000000, -172.000000)" class="layer-svg-fillable">
            <g transform="translate(174.000000, 151.000000)">
                <g transform="translate(18.000000, 21.000000)">
                    <path d="M14,28 C21.7319865,28 28,21.7319865 28,14 C28,6.2680135 21.7319865,0 14,0 C6.2680135,0 0,6.2680135 0,14 C0,21.7319865 6.2680135,28 14,28 Z M17.3561644,8 C18.2640297,8 19,8.73597027 19,9.64383562 L19,18.3561644 C19,19.2640297 18.2640297,20 17.3561644,20 C16.448299,20 15.7123288,19.2640297 15.7123288,18.3561644 L15.7123288,9.64383562 C15.7123288,8.73597027 16.448299,8 17.3561644,8 Z M10.6438356,8 C11.551701,8 12.2876712,8.73597027 12.2876712,9.64383562 L12.2876712,18.3561644 C12.2876712,19.2640297 11.551701,20 10.6438356,20 C9.73597027,20 9,19.2640297 9,18.3561644 L9,9.64383562 C9,8.73597027 9.73597027,8 10.6438356,8 Z"></path>
                </g>
            </g>
        </g>
    </g>
</svg>`;

register({ svg, role: 'large-pause' });
