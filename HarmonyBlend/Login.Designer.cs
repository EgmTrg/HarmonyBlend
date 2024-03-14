namespace HarmonyBlend
{
	partial class Login
	{
		/// <summary>
		///  Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		///  Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing) {
			if(disposing && (components != null)) {
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		///  Required method for Designer support - do not modify
		///  the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			login_button = new Button();
			username_textBox = new TextBox();
			password_maskedTextBox = new MaskedTextBox();
			pictureBox1 = new PictureBox();
			exit_button = new Button();
			label1 = new Label();
			label2 = new Label();
			loginAnonymous_button = new Button();
			((System.ComponentModel.ISupportInitialize)pictureBox1).BeginInit();
			SuspendLayout();
			// 
			// login_button
			// 
			login_button.Font = new Font("Segoe UI", 12.75F);
			login_button.Location = new Point(156, 232);
			login_button.Name = "login_button";
			login_button.Size = new Size(131, 39);
			login_button.TabIndex = 2;
			login_button.Text = "Giriş";
			login_button.UseVisualStyleBackColor = true;
			login_button.Click += Login_button_Click;
			// 
			// username_textBox
			// 
			username_textBox.Font = new Font("Segoe UI", 12F);
			username_textBox.Location = new Point(95, 150);
			username_textBox.Name = "username_textBox";
			username_textBox.Size = new Size(192, 29);
			username_textBox.TabIndex = 0;
			username_textBox.Leave += username_textBox_Leave;
			// 
			// password_maskedTextBox
			// 
			password_maskedTextBox.Font = new Font("Segoe UI", 12F);
			password_maskedTextBox.Location = new Point(95, 193);
			password_maskedTextBox.Name = "password_maskedTextBox";
			password_maskedTextBox.PasswordChar = '*';
			password_maskedTextBox.Size = new Size(192, 29);
			password_maskedTextBox.TabIndex = 1;
			password_maskedTextBox.KeyDown += password_maskedTextBox_KeyDown;
			// 
			// pictureBox1
			// 
			pictureBox1.Image = Properties.Resources._c8ee5be0_988a_4ba2_a2be_b7f600344b3a_removebg_preview;
			pictureBox1.Location = new Point(12, 12);
			pictureBox1.Name = "pictureBox1";
			pictureBox1.Size = new Size(274, 122);
			pictureBox1.SizeMode = PictureBoxSizeMode.Zoom;
			pictureBox1.TabIndex = 4;
			pictureBox1.TabStop = false;
			// 
			// exit_button
			// 
			exit_button.Font = new Font("Segoe UI", 12.75F);
			exit_button.Location = new Point(13, 232);
			exit_button.Name = "exit_button";
			exit_button.Size = new Size(128, 39);
			exit_button.TabIndex = 4;
			exit_button.Text = "Çıkış";
			exit_button.UseVisualStyleBackColor = true;
			exit_button.Click += Exit_button_Click;
			// 
			// label1
			// 
			label1.AutoSize = true;
			label1.Font = new Font("Segoe UI", 12F);
			label1.Location = new Point(13, 153);
			label1.Name = "label1";
			label1.Size = new Size(81, 21);
			label1.TabIndex = 6;
			label1.Text = "Username";
			// 
			// label2
			// 
			label2.AutoSize = true;
			label2.Font = new Font("Segoe UI", 12F);
			label2.Location = new Point(13, 196);
			label2.Name = "label2";
			label2.Size = new Size(76, 21);
			label2.TabIndex = 5;
			label2.Text = "Password";
			// 
			// loginAnonymous_button
			// 
			loginAnonymous_button.Location = new Point(14, 278);
			loginAnonymous_button.Name = "loginAnonymous_button";
			loginAnonymous_button.Size = new Size(273, 23);
			loginAnonymous_button.TabIndex = 3;
			loginAnonymous_button.Text = "Kullanıcısız Giriş";
			loginAnonymous_button.UseVisualStyleBackColor = true;
			loginAnonymous_button.Click += button1_Click;
			// 
			// Login
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			ClientSize = new Size(299, 309);
			Controls.Add(loginAnonymous_button);
			Controls.Add(label2);
			Controls.Add(label1);
			Controls.Add(pictureBox1);
			Controls.Add(password_maskedTextBox);
			Controls.Add(username_textBox);
			Controls.Add(exit_button);
			Controls.Add(login_button);
			MaximumSize = new Size(315, 348);
			MinimumSize = new Size(315, 348);
			Name = "Login";
			StartPosition = FormStartPosition.CenterScreen;
			Text = "Form1";
			((System.ComponentModel.ISupportInitialize)pictureBox1).EndInit();
			ResumeLayout(false);
			PerformLayout();
		}

		#endregion
		private Button login_button;
		private TextBox username_textBox;
		private MaskedTextBox password_maskedTextBox;
		private PictureBox pictureBox1;
		private Button exit_button;
		private Label label1;
		private Label label2;
		private Button loginAnonymous_button;
	}
}
