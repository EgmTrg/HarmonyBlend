namespace HarmonyBlend.Pages.Order
{
	partial class OrderDetails
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
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
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle2 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle3 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle4 = new DataGridViewCellStyle();
			header1 = new UserControls.Header();
			OrderDetailed_groupBox = new GroupBox();
			button3 = new Button();
			button1 = new Button();
			button2 = new Button();
			panel2 = new Panel();
			dataGridView1 = new DataGridView();
			richTextBox1 = new RichTextBox();
			Check = new DataGridViewCheckBoxColumn();
			ProductName = new DataGridViewTextBoxColumn();
			Amount = new DataGridViewTextBoxColumn();
			Unit = new DataGridViewTextBoxColumn();
			ReceivedAmont = new DataGridViewTextBoxColumn();
			Note = new DataGridViewTextBoxColumn();
			OrderDetailed_groupBox.SuspendLayout();
			panel2.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
			SuspendLayout();
			// 
			// header1
			// 
			header1.Dock = DockStyle.Top;
			header1.Location = new Point(0, 0);
			header1.Name = "header1";
			header1.Size = new Size(906, 30);
			header1.TabIndex = 0;
			// 
			// OrderDetailed_groupBox
			// 
			OrderDetailed_groupBox.Controls.Add(richTextBox1);
			OrderDetailed_groupBox.Controls.Add(button3);
			OrderDetailed_groupBox.Controls.Add(button1);
			OrderDetailed_groupBox.Controls.Add(button2);
			OrderDetailed_groupBox.Dock = DockStyle.Bottom;
			OrderDetailed_groupBox.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold, GraphicsUnit.Point, 162);
			OrderDetailed_groupBox.Location = new Point(0, 435);
			OrderDetailed_groupBox.Name = "OrderDetailed_groupBox";
			OrderDetailed_groupBox.Size = new Size(906, 100);
			OrderDetailed_groupBox.TabIndex = 12;
			OrderDetailed_groupBox.TabStop = false;
			OrderDetailed_groupBox.Text = "Sipariş hakkındaki değişiklikleri yazabilirsiniz.";
			// 
			// button3
			// 
			button3.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold);
			button3.Location = new Point(711, 52);
			button3.Name = "button3";
			button3.Size = new Size(86, 43);
			button3.TabIndex = 1;
			button3.Text = "IPTAL";
			button3.UseVisualStyleBackColor = true;
			// 
			// button1
			// 
			button1.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold);
			button1.Location = new Point(803, 52);
			button1.Name = "button1";
			button1.Size = new Size(86, 43);
			button1.TabIndex = 1;
			button1.Text = "ONAYLA";
			button1.UseVisualStyleBackColor = true;
			// 
			// button2
			// 
			button2.Font = new Font("Segoe UI Semibold", 10F, FontStyle.Bold);
			button2.Location = new Point(711, 10);
			button2.Name = "button2";
			button2.Size = new Size(178, 43);
			button2.TabIndex = 1;
			button2.Text = "Hepsini Isaretle";
			button2.UseVisualStyleBackColor = true;
			// 
			// panel2
			// 
			panel2.AccessibleName = "CartDetails";
			panel2.Controls.Add(dataGridView1);
			panel2.Dock = DockStyle.Fill;
			panel2.Location = new Point(0, 30);
			panel2.Name = "panel2";
			panel2.Size = new Size(906, 505);
			panel2.TabIndex = 11;
			// 
			// dataGridView1
			// 
			dataGridView1.AllowUserToAddRows = false;
			dataGridView1.AllowUserToDeleteRows = false;
			dataGridViewCellStyle1.BackColor = Color.FromArgb(224, 224, 224);
			dataGridView1.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle1;
			dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
			dataGridView1.AutoSizeRowsMode = DataGridViewAutoSizeRowsMode.DisplayedCellsExceptHeaders;
			dataGridView1.BackgroundColor = Color.DimGray;
			dataGridView1.BorderStyle = BorderStyle.None;
			dataGridView1.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
			dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle2.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle2.Font = new Font("Segoe UI", 11.25F, FontStyle.Regular, GraphicsUnit.Point, 162);
			dataGridViewCellStyle2.ForeColor = SystemColors.Window;
			dataGridViewCellStyle2.SelectionBackColor = Color.Silver;
			dataGridViewCellStyle2.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle2.WrapMode = DataGridViewTriState.True;
			dataGridView1.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle2;
			dataGridView1.ColumnHeadersHeight = 30;
			dataGridView1.Columns.AddRange(new DataGridViewColumn[] { Check, ProductName, Amount, Unit, ReceivedAmont, Note });
			dataGridViewCellStyle3.Alignment = DataGridViewContentAlignment.MiddleLeft;
			dataGridViewCellStyle3.BackColor = Color.Gainsboro;
			dataGridViewCellStyle3.Font = new Font("Segoe UI", 9F);
			dataGridViewCellStyle3.ForeColor = SystemColors.ControlText;
			dataGridViewCellStyle3.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle3.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle3.WrapMode = DataGridViewTriState.False;
			dataGridView1.DefaultCellStyle = dataGridViewCellStyle3;
			dataGridView1.Dock = DockStyle.Fill;
			dataGridView1.Location = new Point(0, 0);
			dataGridView1.MultiSelect = false;
			dataGridView1.Name = "dataGridView1";
			dataGridView1.ReadOnly = true;
			dataGridViewCellStyle4.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle4.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle4.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			dataGridViewCellStyle4.ForeColor = SystemColors.Window;
			dataGridViewCellStyle4.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle4.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle4.WrapMode = DataGridViewTriState.True;
			dataGridView1.RowHeadersDefaultCellStyle = dataGridViewCellStyle4;
			dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
			dataGridView1.Size = new Size(906, 505);
			dataGridView1.TabIndex = 1;
			// 
			// richTextBox1
			// 
			richTextBox1.Location = new Point(6, 26);
			richTextBox1.Name = "richTextBox1";
			richTextBox1.Size = new Size(699, 68);
			richTextBox1.TabIndex = 2;
			richTextBox1.Text = "";
			// 
			// Check
			// 
			Check.AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCellsExceptHeader;
			Check.Frozen = true;
			Check.HeaderText = "";
			Check.MinimumWidth = 30;
			Check.Name = "Check";
			Check.ReadOnly = true;
			Check.Width = 30;
			// 
			// ProductName
			// 
			ProductName.AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCells;
			ProductName.FillWeight = 771.5736F;
			ProductName.HeaderText = "ProductName";
			ProductName.MinimumWidth = 200;
			ProductName.Name = "ProductName";
			ProductName.ReadOnly = true;
			ProductName.Width = 200;
			// 
			// Amount
			// 
			Amount.FillWeight = 30F;
			Amount.HeaderText = "Amount";
			Amount.MinimumWidth = 100;
			Amount.Name = "Amount";
			Amount.ReadOnly = true;
			// 
			// Unit
			// 
			Unit.FillWeight = 25.3807087F;
			Unit.HeaderText = "Unit";
			Unit.MinimumWidth = 50;
			Unit.Name = "Unit";
			Unit.ReadOnly = true;
			// 
			// ReceivedAmont
			// 
			ReceivedAmont.AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCells;
			ReceivedAmont.HeaderText = "Received Amount";
			ReceivedAmont.MinimumWidth = 100;
			ReceivedAmont.Name = "ReceivedAmont";
			ReceivedAmont.ReadOnly = true;
			ReceivedAmont.Width = 151;
			// 
			// Note
			// 
			Note.FillWeight = 200F;
			Note.HeaderText = "Note";
			Note.MinimumWidth = 200;
			Note.Name = "Note";
			Note.ReadOnly = true;
			// 
			// OrderDetails
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			ClientSize = new Size(906, 535);
			Controls.Add(OrderDetailed_groupBox);
			Controls.Add(panel2);
			Controls.Add(header1);
			FormBorderStyle = FormBorderStyle.None;
			MaximumSize = new Size(906, 535);
			MinimumSize = new Size(906, 535);
			Name = "OrderDetails";
			StartPosition = FormStartPosition.CenterScreen;
			Text = "OrderDetails";
			OrderDetailed_groupBox.ResumeLayout(false);
			panel2.ResumeLayout(false);
			((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
			ResumeLayout(false);
		}

		#endregion

		private UserControls.Header header1;
		private GroupBox OrderDetailed_groupBox;
		internal Button button3;
		internal Button button1;
		internal Button button2;
		private Panel panel2;
		private DataGridView dataGridView1;
		private RichTextBox richTextBox1;
		private DataGridViewCheckBoxColumn Check;
		private DataGridViewTextBoxColumn ProductName;
		private DataGridViewTextBoxColumn Amount;
		private DataGridViewTextBoxColumn Unit;
		private DataGridViewTextBoxColumn ReceivedAmont;
		private DataGridViewTextBoxColumn Note;
	}
}